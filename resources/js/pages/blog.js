/* =========================================================
   BLOG GRID — render
   Used on: index.html, blog.html
   ========================================================= */
(function blogGrid() {
    const grid = document.getElementById("blogGrid");
    if (!grid) return;

    grid.innerHTML = POSTS.map(p => `
    <article class="card bcard reveal ${p.feature ? "bcard--feature" : ""}">
      <a href="${p.url}" aria-label="Read ${p.title}">
        <div class="bcard__art">
          <img src="${p.img}" alt="" loading="lazy">
          <span class="bcard__cat">${p.cat}</span>
        </div>
        <div class="bcard__body">
          <span class="bcard__date">${p.date}</span>
          <h3 class="bcard__title">${p.title}</h3>
          <p class="bcard__excerpt">${p.excerpt}</p>
          <div class="bcard__foot">
            <span>${p.read}</span>
            <span>Read →</span>
          </div>
        </div>
      </a>
    </article>
  `).join("");

    grid.querySelectorAll("img").forEach((img, i) =>
        withFallback(img, "rf-blog-" + i, 900, 560));

    /* Re-observe reveal elements */
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