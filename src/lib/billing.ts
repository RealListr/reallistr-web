// lib/billing.ts
export async function runBillingCycle() {
  const dueSubs = await getDueSubscriptions(); // TODO: implement with your DB

  for (const sub of dueSubs) {
    try {
      const customer = await getCustomer(sub.customer_id); // TODO
      if (!customer?.bpoint_token_ref) { await markInvoiceFailed(sub.id, "no_token"); continue; }

      const resp = await fetch(`${process.env.PUBLIC_BASE_URL}/api/token/charge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal": process.env.CRON_SECRET!
        },
        body: JSON.stringify({
          tokenRef: customer.bpoint_token_ref,
          amountCents: sub.amount_cents,
          currency: "AUD",
          ref: `SUB-${sub.id}-${Date.now()}`
        })
      });

      if (!resp.ok) { await markInvoiceFailed(sub.id, "charge_http_fail"); continue; }
      const data = await resp.json();

      if (data.responseCode === "0") {
        await markInvoicePaid(sub.id, data.receiptNumber); // TODO
        await renewSubscription(sub.id);                    // TODO
      } else {
        await markInvoiceFailed(sub.id, data.responseCode); // TODO
      }
    } catch {
      await markInvoiceFailed(sub.id, "exception"); // TODO
    }
  }
}
