export const Table = (columns, rows) => {
  const thead = `<tr>${columns.map(c=>`<th>${c}</th>`).join("")}</tr>`;
  const tbody = rows
    .map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`)
    .join("");
  return `<table class="table"><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
};
