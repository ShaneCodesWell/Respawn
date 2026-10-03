import { PRODUCTS } from "../data.js";
/* =========================================================
   SHOP PRODUCT — gallery, sizes, qty, related products
   Used on: shop/*
   ========================================================= */
(function shopProduct() {

    /* ---------- GALLERY ---------- */
    const hero = document.getElementById("productHero");
    const heroImg = document.getElementById("productHeroImg");
    const thumbs = document.querySelectorAll(".product-thumb");

    if (hero && heroImg && thumbs.length) {
        thumbs.forEach(thumb => {
            thumb.addEventListener("click", () => {
                if (thumb.classList.contains("is-active")) return;
                hero.classList.add("is-swapping");
                setTimeout(() => {
                    heroImg.src = thumb.dataset.img;
                    hero.classList.remove("is-swapping");
                    thumbs.forEach(t => t.classList.toggle("is-active", t === thumb));
                }, 200);
            });
        });
    }

    /* ---------- SIZE OPTIONS ---------- */
    const sizeWrap = document.getElementById("sizeOptions");
    if (sizeWrap) {
        sizeWrap.addEventListener("click", e => {
            const chip = e.target.closest(".size-chip");
            if (!chip) return;
            sizeWrap.querySelectorAll(".size-chip").forEach(c => c.classList.remove("is-active"));
            chip.classList.add("is-active");
        });
    }

    /* ---------- QUANTITY STEPPER ---------- */
    const qtyInput = document.getElementById("qtyInput");
    if (qtyInput) {
        document.querySelectorAll("[data-qty]").forEach(btn => {
            btn.addEventListener("click", () => {
                const current = parseInt(qtyInput.value, 10) || 1;
                const min = parseInt(qtyInput.min, 10) || 1;
                const max = parseInt(qtyInput.max, 10) || 99;
                const next = btn.dataset.qty === "inc"
                    ? Math.min(current + 1, max)
                    : Math.max(current - 1, min);
                qtyInput.value = next;
            });
        });

        /* sanity clamp if user types garbage */
        qtyInput.addEventListener("blur", () => {
            const min = parseInt(qtyInput.min, 10) || 1;
            const max = parseInt(qtyInput.max, 10) || 99;
            let v = parseInt(qtyInput.value, 10);
            if (isNaN(v) || v < min) v = min;
            if (v > max) v = max;
            qtyInput.value = v;
        });
    }

    /* ---------- RELATED PRODUCTS ---------- */
    const relatedGrid = document.getElementById("relatedGrid");
    if (relatedGrid && typeof PRODUCTS !== "undefined") {
        const limit = parseInt(relatedGrid.dataset.limit, 10) || 4;
        /* Pick a random-ish slice, excluding nothing specific.
           If you want to hide the current product, add data-exclude
           to the grid and compare against it. */
        const excludeSlug = relatedGrid.dataset.exclude;
        const pool = excludeSlug
            ? PRODUCTS.filter(p => !p.url.includes(excludeSlug))
            : PRODUCTS;
        const slice = pool.slice(0, limit);

        relatedGrid.innerHTML = slice.map(p => `
      <article class="card pcard reveal">
        <a href="${p.url}" aria-label="View ${p.name}">
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
              <span class="btn btn--soft btn--sm" data-cart="${p.name}">Add</span>
            </div>
          </div>
        </a>
      </article>
    `).join("");

        /* Re-observe reveals */
        if ("IntersectionObserver" in window) {
            const obs = new IntersectionObserver((entries, o) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        entry.target.style.transitionDelay = `${Math.min(i * 60, 300)}ms`;
                        entry.target.classList.add("in");
                        o.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
            relatedGrid.querySelectorAll(".reveal").forEach(el => obs.observe(el));
        }
    }
})();