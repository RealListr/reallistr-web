"use client";
import { useEffect, useRef, useState } from "react";
declare global { interface Window { BPOINT?: any } }

export default function Checkout() {
  const [authkey, setAuthkey] = useState("");
  const [status, setStatus] = useState("Initialising…");
  const once = useRef(false);

  // Load BPOINT script
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://www.bpoint.com.au/rest/clientscripts/api.js";
    s.async = true;
    s.onload = () => console.log("BPOINT js loaded");
    document.body.appendChild(s);
  }, []);

  // Get authkey
  useEffect(() => {
    if (once.current) return; once.current = true;
    (async () => {
      const r = await fetch(`/api/pay/initiate?amount=1000&ref=RL-DEMO-1`);
      if (!r.ok) { setStatus("Init failed"); return; }
      const j = await r.json();
      setAuthkey(j.authkey);
      setStatus("Ready");
    })();
  }, []);

  // Setup iframe fields
  useEffect(() => {
    if (!authkey || !window.BPOINT) return;
    const { BPOINT } = window;

    BPOINT.txn.authkey.setupIframeFields(authkey, {
      card: {
        number: { selector: "#cardNumberField" },
        expiry: {
          month: { selector: "#expiryMonthField" },
          year: { selector: "#expiryYearField" }
        },
        cvn: { selector: "#cvnField" },
        name: { selector: "#nameOnCardField" }
      },
      fieldClasses: { focused: "is-focused", invalid: "is-invalid", valid: "is-valid" },
      onFormLoaded(controller:any) {
        const btn = document.getElementById("submitButton");
        btn?.addEventListener("click", async () => {
          controller.submit(async (code:string, data:any) => {
            if (code !== "success") { alert(data?.message || "Form error"); return; }
            setStatus("Processing…");
            const resp = await fetch("/api/pay/process", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ authkey })
            });
            if (!resp.ok) { setStatus("Process failed"); return; }
            const rj = await resp.json();
            setStatus(rj.responseCode === "0"
              ? `Success • Receipt ${rj.receiptNumber}`
              : `Declined • Receipt ${rj.receiptNumber || "N/A"}`);
          });
        });
      }
    });
  }, [authkey]);

  return (
    <div style={{maxWidth:460,margin:"40px auto",fontFamily:"system-ui"}}>
      <h1>Checkout</h1>
      <p>Status: {status}</p>

      <div style={{margin:"8px 0"}}>
        <label>Card number</label>
        <div className="frame-field" id="cardNumberField" />
      </div>
      <div style={{display:"flex",gap:8}}>
        <div style={{flex:1}}>
          <label>Expiry month</label>
          <div className="frame-field" id="expiryMonthField" />
        </div>
        <div style={{flex:1}}>
          <label>Expiry year</label>
          <div className="frame-field" id="expiryYearField" />
        </div>
      </div>
      <div style={{margin:"8px 0"}}>
        <label>CVN</label>
        <div className="frame-field" id="cvnField" />
      </div>
      <div style={{margin:"8px 0"}}>
        <label>Name on card</label>
        <div className="frame-field" id="nameOnCardField" />
      </div>
      <button id="submitButton" style={{padding:"10px 16px"}}>Pay $10.00</button>

      <style>{`
        .frame-field{border:1px solid #333;min-height:32px;padding:6px;border-radius:6px}
        .frame-field.is-focused{border-color:#80bdff;box-shadow:0 0 0 .2rem rgba(0,123,255,.25)}
        .frame-field.is-invalid{border-color:#dc3545}
        .frame-field.is-valid{border-color:#28a745}
      `}</style>
    </div>
  );
}
