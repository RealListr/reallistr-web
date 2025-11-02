/* editor.js — RealListr Connect Centre
   Minimal, self-contained boot with routing + Agents Property Editor form.
   - Reads auth (r_code, r_sectors) from storage
   - Renders Home cards based on sectors
   - Renders Agents form with Save (POST /api/properties, fallback to localStorage)
*/

(() => {
  // ---------- DOM helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const show = (el) => (el.style.display = "");
  const hide = (el) => (el.style.display = "none");

  // ---------- Elements ----------
  const els = {
    tabs: $("#topTabs"),
    btnPartner: $("#partnerBtn"),
    btnLogin: $("#loginBtn"),
    btnLogout: $("#logoutBtn"),
    who: $("#whoAmI"),
    landing: $("#section-landing"),
    partners: $("#section-partners"),
    home: $("#section-home"),
    agents: $("#section-agents"),
    finance: $("#section-finance"),
    insurance: $("#section-insurance"),
    energy: $("#section-energy"),
    subs: $("#section-subscriptions"),
    homeCards: $("#homeCards"),
    flash: $("#flash"),
    agentsFormHost: $("#agents-form"),
  };

  const ALL_SECTIONS = [
    "section-landing",
    "section-partners",
    "section-home",
    "section-agents",
    "section-finance",
    "section-insurance",
    "section-energy",
    "section-subscriptions",
  ];

  // ---------- Auth / session ----------
  function getSession() {
    const code = localStorage.getItem("r_code") || "";
    let sectors = [];
    try {
      sectors = JSON.parse(localStorage.getItem("r_sectors") || "[]");
    } catch {}
    const authed = sessionStorage.getItem("r_authed") === "1";
    return { code, sectors, authed };
  }

  function isAuthed() {
    const s = getSession();
    return !!(s.code && s.sectors.length > 0 && s.authed);
  }

  function setAuthedOn() {
    sessionStorage.setItem("r_authed", "1");
  }

  // ---------- Routing ----------
  function activateTab(tabName) {
    // Hide all
    ALL_SECTIONS.forEach((id) => hide(document.getElementById(id)));
    // De-highlight tabs
    $$("#topTabs a").forEach((a) => a.classList.remove("active"));

    // Guard: if not authed, show landing only
    if (!isAuthed()) {
      show(els.landing);
      return;
    }

    // Show requested
    const map = {
      home: els.home,
      agents: els.agents,
      finance: els.finance,
      insurance: els.insurance,
      energy: els.energy,
      subscriptions: els.subs,
    };
    const el = map[tabName] || els.home;
    show(el);

    // Highlight tab
    const tabA = $(`#topTabs a[data-tab="${tabName}"]`);
    if (tabA) tabA.classList.add("active");

    // Post-render hooks
    if (el === els.home) renderHome();
    if (el === els.agents) renderAgentsForm(); // make sure form is there
  }

  function go(tab) {
    history.replaceState({}, "", `#/` + tab);
    activateTab(tab);
  }

  window.addEventListener("hashchange", () => {
    const tab = (location.hash || "#/home").replace("#/", "") || "home";
    activateTab(tab);
  });

  // ---------- UI wiring ----------
  function bindTopNav() {
    // Show tabs only when authed
    const authed = isAuthed();
    $$("#topTabs a").forEach((a) => (a.style.display = authed ? "" : "none"));
    els.btnLogout.style.display = authed ? "" : "none";
    els.btnLogin.style.display = authed ? "none" : "";
    els.who.textContent = authed ? `Code: ${getSession().code}` : "";

    // Click handlers (Home/Agents/…)
    $$("#topTabs a").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const tab = a.dataset.tab;
        go(tab);
      });
    });

    // Landing buttons
    const landingLogin = $("#landingLogin");
    const landingPartner = $("#landingPartner");
    if (landingLogin) landingLogin.onclick = openLogin;
    if (landingPartner) landingPartner.onclick = () => {
      hide(els.landing);
      show(els.partners);
    };

    els.btnPartner.onclick = () => {
      if (!isAuthed()) {
        hide(els.landing);
        show(els.partners);
      } else {
        go("subscriptions");
      }
    };
    els.btnLogin.onclick = openLogin;
    els.btnLogout.onclick = doLogout;

    // Login modal wires
    const modal = $("#loginModal");
    const codeInput = $("#loginCode");
    const btnConfirm = $("#loginConfirm");
    const btnCancel = $("#loginCancel");
    const msg = $("#loginMsg");

    function close() {
      hide(modal);
      msg.textContent = "";
      codeInput.value = "";
    }
    function openLogin() {
      show(modal);
      codeInput.focus();
    }
    window.openLogin = openLogin;

    btnCancel.onclick = close;

    btnConfirm.onclick = async () => {
      msg.textContent = "";
      const raw = (codeInput.value || "").trim();
      if (!raw) {
        msg.textContent = "Enter your 6-digit code.";
        return;
      }
      try {
        const r = await fetch(`/api/tokens/${encodeURIComponent(raw)}`);
        if (!r.ok) {
          msg.textContent = "Invalid code";
          return;
        }
        const data = await r.json();
        // Persist
        localStorage.setItem("r_code", data.code);
        localStorage.setItem("r_sectors", JSON.stringify(data.sectors || []));
        setAuthedOn();
        close();
        bindTopNav();
        go("home");
      } catch (e) {
        msg.textContent = "Network error";
      }
    };
  }

  function doLogout() {
    sessionStorage.removeItem("r_authed");
    localStorage.removeItem("r_code");
    localStorage.removeItem("r_sectors");
    location.href = "editor.html";
  }

  // ---------- Home cards ----------
  function renderHome() {
    const { sectors } = getSession();
    const host = els.homeCards;
    if (!host) return;
    host.innerHTML = "";

    const PORTALS = [
      {
        key: "agents",
        title: "Agents",
        desc: "Property editor & listings.",
        tab: "agents",
      },
      {
        key: "finance",
        title: "Finance",
        desc: "Purchased mortgage/refi leads.",
        tab: "finance",
      },
      {
        key: "insurance",
        title: "Insurance",
        desc: "Purchased insurance leads.",
        tab: "insurance",
      },
      {
        key: "energy",
        title: "Energy",
        desc: "Solar/storage/utilities leads.",
        tab: "energy",
      },
    ];

    PORTALS.filter((p) => sectors.includes(p.key)).forEach((p) => {
      const card = document.createElement("div");
      card.className = "home-card";
      card.innerHTML = `
        <div>
          <div class="title">${p.title}</div>
          <div class="desc">${p.desc}</div>
        </div>
        <button class="btn" data-open="${p.tab}">Open</button>
      `;
      host.appendChild(card);
    });

    // Wire “Open”
    $$('[data-open]', host).forEach((btn) =>
      btn.addEventListener("click", () => go(btn.getAttribute("data-open")))
    );
  }

  // ---------- Agents: Property Editor ----------
  function renderAgentsForm() {
    if (!els.agentsFormHost) return;

    els.agentsFormHost.innerHTML = `
      <div class="section">
        <div class="grid two">
          <label>Title
            <input id="p_title" placeholder="e.g., Elegant 2-bed in JLT">
          </label>
          <label>Price (number)
            <input id="p_price" type="number" inputmode="numeric" placeholder="4250000">
          </label>
        </div>
        <label>Street address
          <input id="p_street" placeholder="One JLT, Jumeirah Lake Towers">
        </label>
        <div class="grid two">
          <label>Bedrooms
            <select id="p_beds">
              <option>1</option><option selected>2</option><option>3</option><option>4</option><option>5</option>
            </select>
          </label>
          <label>Bathrooms
            <select id="p_baths">
              <option>1</option><option selected>2</option><option>3</option><option>4</option>
            </select>
          </label>
        </div>
        <label>Hero Image URL
          <input id="p_hero" placeholder="https://...">
        </label>
        <label>Description
          <textarea id="p_desc" placeholder="South light, EV charging, close to metro..."></textarea>
        </label>
        <div class="actions">
          <button id="p_save" class="btn primary">Save</button>
          <span id="p_status" class="muted"></span>
        </div>
      </div>
    `;

    const status = $("#p_status", els.agentsFormHost);
    const title = $("#p_title", els.agentsFormHost);
    const price = $("#p_price", els.agentsFormHost);
    const street = $("#p_street", els.agentsFormHost);
    const beds = $("#p_beds", els.agentsFormHost);
    const baths = $("#p_baths", els.agentsFormHost);
    const hero = $("#p_hero", els.agentsFormHost);
    const desc = $("#p_desc", els.agentsFormHost);
    const btnSave = $("#p_save", els.agentsFormHost);

    btnSave.onclick = async () => {
      status.textContent = "";
      const payload = {
        title: (title.value || "").trim(),
        price: Number(price.value || "0"),
        street: (street.value || "").trim(),
        beds: Number(beds.value || "0"),
        baths: Number(baths.value || "0"),
        hero: (hero.value || "").trim(),
        desc: (desc.value || "").trim(),
        savedAt: new Date().toISOString(),
      };

      if (!payload.title) {
        status.textContent = "Title required.";
        status.className = "muted bad";
        return;
      }

      // Try API first
      try {
        const r = await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!r.ok) throw new Error("API not available");

        status.textContent = "Saved to server.";
        status.className = "muted";
      } catch (e) {
        // Fallback to localStorage
        const key = "rl_props";
        const arr = JSON.parse(localStorage.getItem(key) || "[]");
        arr.unshift(payload);
        localStorage.setItem(key, JSON.stringify(arr));
        status.textContent = "Saved locally (API not present).";
        status.className = "muted";
      }
    };
  }

  // ---------- Boot ----------
  function boot() {
    bindTopNav();
    // If already authed, show Home; else show Landing
    if (isAuthed()) {
      show(els.home);
      $$("#topTabs a").forEach((a) => (a.style.display = ""));
      go((location.hash || "#/home").replace("#/", "") || "home");
    } else {
      hide(els.partners); hide(els.home); hide(els.agents);
      hide(els.finance); hide(els.insurance); hide(els.energy); hide(els.subs);
      show(els.landing);
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
