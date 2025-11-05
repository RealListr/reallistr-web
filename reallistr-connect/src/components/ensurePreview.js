export function ensurePreviewSlot() {
  // If a #p_preview container exists, use it; else create one after the form.
  if (document.getElementById('p_preview')) return;
  const grid = document.querySelector('.editor-grid');
  const host = grid || document.querySelector('main') || document.getElementById('app');
  const wrap = document.createElement('div');
  wrap.id = 'p_preview';
  wrap.className = 'preview-card';
  wrap.style.minHeight = '260px';
  wrap.style.margin = '12px 0';
  host.appendChild(wrap);
}
