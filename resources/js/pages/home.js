/* =========================================================
   HOME — hero carousel only
   ========================================================= */
(function heroCarousel() {
    const root = document.getElementById("heroCarousel");
    const track = document.getElementById("heroTrack");
    if (!root || !track) return;

    const slides = [...track.querySelectorAll("[data-slide]")];
    const dotsWrap = document.getElementById("heroDots");
    const progress = document.getElementById("heroProgress");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const DURATION = 7000;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let index = 0;
    let timer = null;

    slides.forEach((_, i) => {
        const b = document.createElement("button");
        b.className = "dot";
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", `Go to slide ${i + 1}`);
        b.addEventListener("click", () => go(i, true));
        dotsWrap.appendChild(b);
    });
    const dots = [...dotsWrap.children];

    function render() {
        track.style.transform = `translateX(-${index * 100}%)`;
        slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
        dots.forEach((d, i) => {
            d.classList.toggle("active", i === index);
            d.setAttribute("aria-selected", i === index);
        });
    }

    function go(i, manual) {
        index = (i + slides.length) % slides.length;
        render();
        if (manual) restart();
    }

    const next = () => go(index + 1);
    const prev = () => go(index - 1);

    function startProgress() {
        if (reduce || !progress) return;
        progress.style.transition = "none";
        progress.style.width = "0%";
        void progress.offsetWidth;
        progress.style.transition = `width ${DURATION}ms linear`;
        progress.style.width = "100%";
    }

    function start() {
        if (reduce) return;
        stop();
        startProgress();
        timer = setInterval(next, DURATION);
    }

    function stop() {
        clearInterval(timer);
        timer = null;
        if (progress) {
            progress.style.transition = "width .3s ease";
            progress.style.width = "0%";
        }
    }

    function restart() { stop(); start(); }

    if (prevBtn) prevBtn.addEventListener("click", () => go(index - 1, true));
    if (nextBtn) nextBtn.addEventListener("click", () => go(index + 1, true));

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    root.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft") { e.preventDefault(); prev(); restart(); }
        if (e.key === "ArrowRight") { e.preventDefault(); next(); restart(); }
    });

    let touchX = 0, touchY = 0;
    root.addEventListener("touchstart", e => {
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
    }, { passive: true });

    root.addEventListener("touchend", e => {
        const dx = e.changedTouches[0].clientX - touchX;
        const dy = e.changedTouches[0].clientY - touchY;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
            dx < 0 ? next() : prev();
            restart();
        }
    }, { passive: true });

    document.addEventListener("visibilitychange", () =>
        document.hidden ? stop() : start());

    render();
    start();
})();