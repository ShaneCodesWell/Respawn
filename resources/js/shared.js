/* =========================================================
   SHARED — behaviour used across every page
   Nav, theme, modal, toast, reveal, forms, channel links
   ========================================================= */

/* ---------- THEME TOGGLE ---------- */
(function themeController() {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const readTheme = () =>
        document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

    function syncToggle(theme) {
        toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
        toggle.setAttribute("aria-label",
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
    function applyTheme(theme, persist) {
        document.documentElement.setAttribute("data-theme", theme);
        syncToggle(theme);
        if (persist !== false) {
            try { localStorage.setItem("rf-theme", theme); } catch (e) { }
        }
    }

    toggle.addEventListener("click", () => {
        applyTheme(readTheme() === "dark" ? "light" : "dark");
    });

    syncToggle(readTheme());

    prefersDark.addEventListener("change", e => {
        let saved = null;
        try { saved = localStorage.getItem("rf-theme"); } catch (err) { }
        if (!saved) applyTheme(e.matches ? "dark" : "light", false);
    });
})();

/* ---------- NAV ---------- */
(function navController() {
    const nav = document.getElementById("nav");
    const navMenu = document.getElementById("navMenu");
    const navToggle = document.getElementById("navToggle");
    const navLinks = [...document.querySelectorAll(".nav__link")];
    const heroEl = document.getElementById("home");

    if (nav && navMenu && navToggle) {
        function updateNav() {
            const heroEl = document.getElementById("home");

            /* No hero on this page → nav is always in the solid state */
            if (!heroEl) {
                nav.classList.add("is-stuck");
                return;
            }

            const threshold = Math.max(heroEl.offsetHeight - 160, 120);
            nav.classList.toggle("is-stuck", window.scrollY > threshold);
        }
        window.addEventListener("scroll", updateNav, { passive: true });
        window.addEventListener("resize", updateNav);
        updateNav();

        navToggle.addEventListener("click", () => {
            const open = navMenu.classList.toggle("open");
            navToggle.classList.toggle("open", open);
            navToggle.setAttribute("aria-expanded", open);
        });

        navLinks.forEach(a => a.addEventListener("click", () => {
            navMenu.classList.remove("open");
            navToggle.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        }));
    }

    /* Active link highlight */
    if (navLinks.length) {
        const spy = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    navLinks.forEach(l =>
                        l.classList.toggle("active",
                            l.getAttribute("href") === "#" + e.target.id));
                }
            });
        }, { rootMargin: "-45% 0px -50% 0px" });

        document.querySelectorAll("section[id]").forEach(s => spy.observe(s));
    }
})();

/* ---------- MODAL VIDEO PLAYER ---------- */
const modal = document.getElementById("modal");
const player = document.getElementById("modalPlayer");

function openVideo(id, vertical = false) {
    if (!modal || !player) return;
    player.classList.toggle("is-vertical", vertical);
    player.innerHTML = `
    <iframe
      src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1"
      title="Video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>`;
    modal.classList.add("is-open");
    document.body.classList.add("no-scroll");
}

function closeVideo() {
    if (!modal || !player) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    player.innerHTML = "";
}

document.addEventListener("click", e => {
    const card = e.target.closest("[data-video]");
    if (card) {
        openVideo(card.dataset.video, card.dataset.vertical === "1");
        return;
    }
    if (e.target.closest("[data-close]")) closeVideo();
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal && modal.classList.contains("is-open")) closeVideo();

    if ((e.key === "Enter" || e.key === " ") &&
        document.activeElement?.dataset?.video) {
        e.preventDefault();
        const el = document.activeElement;
        openVideo(el.dataset.video, el.dataset.vertical === "1");
    }
});

/* ---------- TOAST ---------- */
const toast = document.getElementById("toast");
let toastTimer;

function showToast(html) {
    if (!toast) return;
    toast.innerHTML = html;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 4200);
}

/* ---------- SCROLL REVEAL ---------- */
(function revealOnScroll() {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${Math.min(i * 70, 340)}ms`;
                entry.target.classList.add("in");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
})();

/* ---------- FORMS ---------- */
const requestForm = document.getElementById("requestForm");
if (requestForm) {
    requestForm.addEventListener("submit", e => {
        e.preventDefault();
        if (!requestForm.checkValidity()) { requestForm.reportValidity(); return; }
        const first = requestForm.name.value.trim().split(" ")[0];
        showToast(`<span><strong>Request sent!</strong> Thanks ${first} — I'll reply within 48 hours.</span>`);
        requestForm.reset();
    });
}

const newsForm = document.getElementById("newsForm");
if (newsForm) {
    newsForm.addEventListener("submit", e => {
        e.preventDefault();
        showToast(`<span><strong>You're in.</strong> Check your inbox to confirm.</span>`);
        newsForm.reset();
    });
}

/* ---------- CART BUTTON FEEDBACK ---------- */
document.addEventListener("click", e => {
    const btn = e.target.closest("[data-cart]");
    if (btn) showToast(`<span><strong>Added:</strong> ${btn.dataset.cart}</span>`);
});

/* ---------- MISC ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

document.querySelectorAll("[data-yt]").forEach(a => {
    a.href = CHANNEL_URL;
    a.target = "_blank";
    a.rel = "noopener";
});