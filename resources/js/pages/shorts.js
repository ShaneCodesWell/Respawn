/* =========================================================
   SHORTS RAIL — render + coverflow + floating arrows
   Used on: home and shorts archive pages
   ========================================================= */
(function shortsRail() {
    const rail = document.getElementById("shortsRail");
    if (!rail) return;

    const cards = [...rail.querySelectorAll(".scard")];
    if (!cards.length) return;
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