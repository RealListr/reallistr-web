// Feed Preview Renderer (simple visual card view)
function renderFeederCards(containerId = "feed") {
  const el = document.getElementById(containerId);
  if (!el) return;

  const items = JSON.parse(localStorage.getItem("connect-centre:agents") || "[]");
  if (!items.length) {
    el.innerHTML = `<div class="muted">No listings to preview yet.</div>`;
    return;
  }

  el.innerHTML = items
    .map(
      (it) => `
      <div class="listing" style="border:1px solid #e5e7eb;border-radius:16px;padding:16px;margin-bottom:10px;display:flex;gap:16px;align-items:center;background:#fff;">
        <img src="${it.media || "https://placehold.co/100x100?text=No+Img"}" style="width:100px;height:100px;object-fit:cover;border-radius:12px;background:#f3f4f6">
        <div style="flex:1">
          <h3 style="margin:0 0 4px">${it.title || "Untitled"}</h3>
          <p style="margin:0"><b>${it.price || ""}</b> — ${it.address || ""}</p>
          <p style="margin:2px 0;color:#6b7280;font-size:14px">
            ${(it.category || "")} ${it.propertyType ? "· " + it.propertyType : ""} ${it.saleMethod ? "· " + it.saleMethod : ""}
          </p>
          ${
            it.highlights?.length
              ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;">${it.highlights
                  .map((h) => `<span style="border:1px solid #e5e7eb;border-radius:999px;padding:2px 8px;font-size:12px;">${h}</span>`)
                  .join("")}</div>`
              : ""
          }
        </div>
      </div>
    `
    )
    .join("");
}
