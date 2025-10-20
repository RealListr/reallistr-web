// app/checkout/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    BPOINT?: any;
  }
}

export default function CheckoutPage() {
  const [authkey, setAuthkey] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const loadedRef = useRef(false);

  // Load BPOINT client script
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://www.bpoint.com.au/rest/clientscripts/api.js";
    s.async = true;
    s.onload = () => console.log("BPOINT js loaded");
    document.body.appendChild(s);
  }, []);

  // Initiate payment (get authkey) once
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    (async () => {
      setStatus("Initialising payment...");
      const res = await fetch(`/api/pay/initiate?amount=1000&ref=RL-DEMO-1001`);
      if (!res.ok) {
        setStatus("Failed to initialise");
        return;
      }
      const json = await res.json();
      setAuthkey(json.authkey);
      setStatus("Ready");
    })();
  }, []);

  // Setup iframe fields when authkey present and script loaded
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
      fieldClasses: {
        focused: "is-focused",
        invalid: "is-invalid",
        valid: "is-valid"
      },
      onFormLoaded: function (controller: any) {
        const btn = document.getElementById("submitButton");
        if (!btn) return;
        btn.addEventListener("click", () => {
          controller.submit(async (code: string, data: any) => {
            if (code === "success") {
              setStatus("Processing...");
              const resp = await fetch("/api/pay/process", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ authkey })
              });
              if (!resp.ok) {
                setStatus("Payment failed to process.");
                return;
              }
              const rj = await resp.json();
              if (rj.responseCode === "0") {
                setStatus(`Success! Receipt: ${rj.receiptNumber}`);
              } else {
                setStatus(`Declined. Receipt: ${rj.receiptNumber || "N/A"}`);
              }
            } else {
              alert(
                `${data?.message || "Form error"} - ${data?.details?.[0]?.code || ""} - ${data?.details?.[0]?.field || ""} - ${data?.details?.[0]?.message || ""}`
              );
            }
          });
        });
      }
    });
  }, [authkey]);

  return (
    <div style={{ maxWidth: 440, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>RealListr Payment</h2>
      <p>Status: {status}</p>

      <div id="paymentMethodForm" style={{ display: "block" }}>
        <div style={{ margin: "8px 0" }}>
          <label>Card number</label>
          <div className="frame-field" id="cardNumberField" />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <label>Expiry month</label>
            <div className="frame-field" id="expiryMonthField" />
          </div>
          <div style={{ flex: 1 }}>
            <label>Expiry year</label>
            <div className="frame-field" id="expiryYearField" />
          </div>
        </div>
        <div style={{ margin: "8px 0" }}>
          <label>CVN</label>
          <div className="frame-field" id="cvnField" />
        </div>
        <div style={{ margin: "8px 0" }}>
          <label>Name on card</label>
          <div className="frame-field" id="nameOnCardField" />
        </div>
        <button id="submitButton" style={{ padding: "10px 16px" }}>Pay $10.00</button>
      </div>

      <style>{`
        .frame-field {
          border: 1px solid #333333;
          background-color: #fefefe;
          min-height: 32px;
          padding: 6px;
          border-radius: 6px;
        }
        .frame-field.is-focused {
          color: #495057;
          background-color: #fff;
          border-color: #80bdff;
          outline: 0;
          box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
        }
        .frame-field.is-invalid { border-color: #dc3545; }
        .frame-field.is-valid { border-color: #28a745; }
      `}</style>
    </div>
  );
}
