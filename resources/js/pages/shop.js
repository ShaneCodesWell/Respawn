/* =========================================================
   STORE GRID — render
   Used on: index.html, shop.html
   ========================================================= */
(function storeGrid() {
    const grid = document.getElementById("storeGrid");
    if (!grid) return;

    grid.innerHTML = PRODUCTS.map(p => `
    <article class="card pcard reveal">
      <div class="pcard__art">
        <img src="${p.img}" alt="" loading="lazy">
        ${p.badge ? `<span class="pcard__badge">${p.badge}</span>` : ""}
        <span class="pcard__glyph">${p.glyph}</span>
      </div>
      <div class="pcard__body">
        <h3 class="pcard__name">${p.name}</h3>
        <p class="pcard__sub">${p.sub}</p>
        <div class="pcard__row">
          <span class="pcard__price">${p.price}</span>
          <button class="btn btn--soft btn--sm" data-cart="${p.name}">Add</button>
        </div>
      </div>
    </article>
  `).join("");

    grid.querySelectorAll("img").forEach((img, i) =>
        withFallback(img, "rf-shop-" + i, 600, 600));

    if ("IntersectionObserver" in window) {
        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = `${Math.min(i * 70, 340)}ms`;
                    entry.target.classList.add("in");
                    o.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
        grid.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    }
})();