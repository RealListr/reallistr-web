export const Card = (classes, title, bodyHTML, ctaHTML = "") => `
  <section class="card ${classes}">
    <div class="h2">${title}</div>
    <div class="sub">&nbsp;</div>
    <div>${bodyHTML}</div>
    <div class="cta">${ctaHTML}</div>
  </section>
`;
