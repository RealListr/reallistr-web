export async function createCheckout(packageKey: "starter"|"pro"|"elite") {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ packageKey }),
  });
  if (!res.ok) throw new Error("Failed to init checkout");
  return res.json() as Promise<{ url: string }>;
}
