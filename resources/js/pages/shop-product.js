/* =========================================================
   SHOP PRODUCT — gallery, sizes, qty
   ========================================================= */
(function shopProduct() {
    /* ---------- GALLERY ---------- */
    const hero = document.getElementById("productHero");
    const heroImg = document.getElementById("productHeroImg");
    const thumbs = document.querySelectorAll(".product-thumb");

    if (hero && heroImg && thumbs.length) {
        thumbs.forEach((thumb) => {
            thumb.addEventListener("click", () => {
                if (thumb.classList.contains("is-active")) return;
                hero.classList.add("is-swapping");
                setTimeout(() => {
                    heroImg.src = thumb.dataset.img;
                    hero.classList.remove("is-swapping");
                    thumbs.forEach((t) => t.classList.toggle("is-active", t === thumb));
                }, 200);
            });
        });
    }

    /* ---------- SIZE OPTIONS ---------- */
    const sizeWrap = document.getElementById("sizeOptions");
    sizeWrap?.addEventListener("click", (e) => {
        const chip = e.target.closest(".size-chip");
        if (!chip) return;
        sizeWrap.querySelectorAll(".size-chip").forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
    });

    /* ---------- QUANTITY STEPPER ---------- */
    const qtyInput = document.getElementById("qtyInput");
    if (qtyInput) {
        const bounds = () => ({
            min: parseInt(qtyInput.min, 10) || 1,
            max: parseInt(qtyInput.max, 10) || 99,
        });

        document.querySelectorAll("[data-qty]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const { min, max } = bounds();
                const current = parseInt(qtyInput.value, 10) || 1;
                qtyInput.value =
                    btn.dataset.qty === "inc" ? Math.min(current + 1, max) : Math.max(current - 1, min);
            });
        });

        qtyInput.addEventListener("blur", () => {
            const { min, max } = bounds();
            let v = parseInt(qtyInput.value, 10);
            if (isNaN(v) || v < min) v = min;
            if (v > max) v = max;
            qtyInput.value = v;
        });
    }
})();