import { SHORTS, ytThumbQ, fallback } from "../data.js";

/* =========================================================
   SHORTS RAIL — render + coverflow + floating arrows
   Used on: home and shorts archive pages
   ========================================================= */
(function shortsRail() {
    const rail = document.getElementById("shortsRail");
    if (!rail) return;

    rail.innerHTML = SHORTS.map(s => `
    <article class="card scard" data-video="${s.id}" data-vertical="1"
             tabindex="0" role="button" aria-label="Play ${s.title}">
      <div class="scard__thumb">
        <img data-yt-thumb="${s.id}" src="${ytThumbQ(s.id)}" alt="" loading="lazy">
        <div class="scard__scrim"></div>
        <span class="scard__views">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
          ${s.views}
        </span>
        <span class="scard__play" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </span>
        <div class="scard__info">
          <h3 class="scard__title">${s.title}</h3>
        </div>
      </div>
    </article>
  `).join("");

    rail.querySelectorAll("[data-yt-thumb]").forEach(img => {
        img.addEventListener("error", function h() {
            img.removeEventListener("error", h);
            img.src = fallback("rf-short-" + img.dataset.ytThumb, 600, 1067);
        });
    });

    const cards = [...rail.querySelectorAll(".scard")];
    const prevBtn = document.getElementById("shortsPrev");
    const nextBtn = document.getElementById("shortsNext");

    function getFalloff() {
        return Math.max(rail.clientWidth * 0.55, 220);
    }

    let ticking = false;

    function update() {
        const railRect = rail.getBoundingClientRect();
        const railCenter = railRect.left + railRect.width / 2;
        const falloff = getFalloff();

        let closest = null;
        let closestDist = Infinity;

        cards.forEach(card => {
            const r = card.getBoundingClientRect();
            const center = r.left + r.width / 2;
            const offset = center - railCenter;
            const abs = Math.min(Math.abs(offset) / falloff, 1);
            const signed = Math.max(Math.min(offset / falloff, 1), -1);

            card.style.setProperty("--d", signed.toFixed(3));
            card.style.setProperty("--a", abs.toFixed(3));

            if (Math.abs(offset) < closestDist) {
                closestDist = Math.abs(offset);
                closest = card;
            }
        });

        cards.forEach(c => c.classList.toggle("is-active", c === closest));

        const max = rail.scrollWidth - rail.clientWidth;
        if (prevBtn) prevBtn.disabled = rail.scrollLeft <= 2;
        if (nextBtn) nextBtn.disabled = rail.scrollLeft >= max - 2;
    }

    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => { update(); ticking = false; });
    }

    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", update);

    function stepSize() {
        const first = cards[0];
        if (!first) return 260;
        const styles = getComputedStyle(rail);
        const gap = parseFloat(styles.columnGap || styles.gap) || 20;
        return first.offsetWidth + gap;
    }

    if (prevBtn) prevBtn.addEventListener("click", () =>
        rail.scrollBy({ left: -stepSize(), behavior: "smooth" }));
    if (nextBtn) nextBtn.addEventListener("click", () =>
        rail.scrollBy({ left: stepSize(), behavior: "smooth" }));

    rail.addEventListener("keydown", e => {
        if (e.key === "ArrowRight") { e.preventDefault(); nextBtn && nextBtn.click(); }
        if (e.key === "ArrowLeft") { e.preventDefault(); prevBtn && prevBtn.click(); }
    });

    /* Drag to scroll (mouse only) */
    let isDown = false, startX = 0, startScroll = 0, dragged = false;
    rail.addEventListener("pointerdown", e => {
        if (e.pointerType !== "mouse") return;
        isDown = true; dragged = false;
        startX = e.clientX; startScroll = rail.scrollLeft;
        rail.classList.add("is-dragging");
    });
    window.addEventListener("pointermove", e => {
        if (!isDown) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 4) dragged = true;
        rail.scrollLeft = startScroll - dx;
    });
    window.addEventListener("pointerup", () => {
        if (!isDown) return;
        isDown = false;
        rail.classList.remove("is-dragging");
    });

    rail.addEventListener("click", e => {
        if (dragged) {
            e.preventDefault();
            e.stopPropagation();
            dragged = false;
        }
    }, true);

    requestAnimationFrame(update);
})();