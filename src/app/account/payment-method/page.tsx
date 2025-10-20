"use client";
import { useEffect, useState } from "react";

declare global { interface Window { BPOINT?: any; } }

export default function SaveCardPage() {
  const [authkey, setAuthkey] = useState("");
  const [status, setStatus] = useState("Loading…");
  const [savedToken, setSavedToken] = useState<string | null>(null);

  // Load BPOINT JS
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://www.bpoint.com.au/rest/clientscripts/api.js";
    s.async = true;
    s.onload = () => console.log("BPOINT script loaded");
    document.body.appendChild(s);
  }, []);

  // Get a token authkey
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/token/initiate?crn1=RL-CUST-123`);
      if (!res.ok) { setStatus("Failed to initialise"); return; }
      const { authkey } = await res.json();
      setAuthkey(authkey);
      setStatus("Ready");
    })();
  }, []);

  // Build token form when ready
  useEffect(() => {
    if (!authkey || !window.BPOINT) return;
    const { BPOINT } = window;

    // Render payment fields for token creation
    // You can also use: BPOINT.token.authkey.setupPaymentMethodForm(...)
    BPOINT.token.authkey.setupIframeFields(authkey, {
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
        const btn = document.getElementById("saveCardBtn");
        btn?.addEventListener("click", () => {
          // Attach card to token authkey
          BPOINT.token.authkey.attachPaymentMethod(authkey, {
            onSuccess: async function () {
              // Process token on server → returns tokenNumber
              const r = await fetch("/api/token/process", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ authkey })
              });
              const j = await r.json();
              if (j?.tokenNumber) {
                setSavedToken(j.tokenNumber);
                setStatus(`Saved • Token ${j.tokenNumber}`);
              } else {
                setStatus("Token saved (no tokenNumber in response)");
              }
            },
            onError: function (_code: any, data: any) {
              alert(data?.message || "Token attach error");
            }
          });
        });
      }
    });
  }, [authkey]);

  return (
    <div style={{ maxWidth: 460, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Save card</h2>
      <p>Status: {status}</p>

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
      <button id="saveCardBtn" style={{ padding: "10px 16px" }}>Save card</button>

      {savedToken && (
        <div style={{ marginTop: 12 }}>
          <strong>Saved token:</strong> {savedToken}
        </div>
      )}

      <style>{`
        .frame-field { border:1px solid #333; min-height:32px; padding:6px; border-radius:6px; }
        .frame-field.is-focused { border-color:#80bdff; box-shadow:0 0 0 .2rem rgba(0,123,255,.25); }
        .frame-field.is-invalid { border-color:#dc3545; }
        .frame-field.is-valid { border-color:#28a745; }
      `}</style>
    </div>
  );
}
