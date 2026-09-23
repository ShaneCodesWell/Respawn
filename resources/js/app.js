/* =========================================================
   CONFIG
   ========================================================= */
const CHANNEL_URL = "https://www.youtube.com/@shaneforevergaming";

/* ---------------------------------------------------------
CONTENT — replace IDs with your real YouTube video IDs
--------------------------------------------------------- */

const VIDEOS = [
    {
        id: "X_gzkwuoG5M",
        title: "Spider-Man 2022",
        cat: "Blind Retrospective",
        tag: "Blind Retrospective",
        duration: "15:46",
        views: "312K",
        date: "2 days ago",
    },
    {
        id: "cxIKn_0MpzI",
        title: "Devil May Cry 5",
        cat: "Blind Retrospective",
        tag: "Blind Retrospective",
        duration: "36:38",
        views: "198K",
        date: "1 week ago",
    },
    {
        id: "vzmREjAQIR4",
        title: "Spider-Man: Miles Morales",
        cat: "Blind Retrospective",
        tag: "Blind Retrospective",
        duration: "15:34",
        views: "540K",
        date: "1 week ago",
    },
    {
        id: "CoXxgkX8T_4",
        title: "Call of Duty: Modern Warfare 2019",
        cat: "Blind Retrospective",
        tag: "Blind Retrospective",
        duration: "17:25",
        views: "87K",
        date: "2 weeks ago",
    },
    {
        id: "69oRIvhSGoU",
        title: "The Last of Us Part - Remastered",
        cat: "letsplay",
        tag: "Let's Play",
        duration: "1:02:11",
        views: "421K",
        date: "2 weeks ago",
    },
    {
        id: "V2VhKQsUOw8",
        title: "I Rebuilt the Entire City in 24 Hours",
        cat: "letsplay",
        tag: "Let's Play",
        duration: "15:29",
        views: "265K",
        date: "3 weeks ago",
    },
];

const SHORTS = [
    {
        id: "Rx-s2IH0VSs",
        title: "Spider-man suits",
        views: "1.2M",
    },
    {
        id: "oOofmZuRU5w",
        title: "POV: you're the last one alive",
        views: "890K",
    },
    { id: "gfKvnK53CaY", title: "That one teammate…", views: "2.4M" },
    {
        id: "p7jkunrjfr0",
        title: "Fastest speedrun trick ever",
        views: "670K",
    },
    { id: "kHW5AuiSEqk", title: "Bro forgot to save 💀", views: "1.8M" },
    { id: "vKAa44pl7Wo", title: "How to win every 1v1", views: "445K" },
];

const POSTS = [
    {
        feature: true,
        cat: "Patch Notes",
        date: "Mar 14, 2026",
        title:
            "The Big Update Changed Everything — Here's What Actually Matters",
        excerpt:
            "The new season dropped and it rewrote half the meta. I spent 40 hours testing builds so you don't have to. Here's the short version, plus the full breakdown over on the channel.",
        read: "8 min read",
        img: "Images/idris-elba-as-7680x4320-13354.jpg",
    },
    {
        cat: "Opinion",
        date: "Mar 09, 2026",
        title: "Why Open Worlds Are Getting Smaller (And Better)",
        excerpt:
            "Bigger maps stopped being impressive years ago. Density is the new flex.",
        read: "5 min read",
        img: "Images/forza-horizon-6-3840x2160-26401.jpg",
    },
    {
        cat: "Behind the Scenes",
        date: "Mar 02, 2026",
        title: "How I Edit a Full Video in Six Hours",
        excerpt:
            "My complete workflow, from raw capture to final export — plugins, presets and all.",
        read: "6 min read",
        img: "Images/cyclops-season-8-5120x2880-26863.jpg",
    },
];

const PRODUCTS = [
    {
        name: "Respawn Forever Tee",
        sub: "Heavyweight cotton",
        price: "$28",
        badge: "New",
        glyph: "TEE",
        img: "https://picsum.photos/seed/respawn-shop-1/600/600",
    },
    {
        name: "Night Ops Hoodie",
        sub: "Drop 004",
        price: "$58",
        badge: "",
        glyph: "HD",
        img: "https://picsum.photos/seed/respawn-shop-2/600/600",
    },
    {
        name: "Sticker Pack Vol. 1",
        sub: "12 vinyl stickers",
        price: "$12",
        badge: "",
        glyph: "STK",
        img: "https://picsum.photos/seed/respawn-shop-3/600/600",
    },
    {
        name: "Thumbnail Preset Pack",
        sub: "Digital download",
        price: "$19",
        badge: "Hot",
        glyph: "PSD",
        img: "https://picsum.photos/seed/respawn-shop-4/600/600",
    },
];

/* =========================================================
HELPERS
========================================================= */
const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
const ytThumbQ = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const fallback = (seed, w, h) =>
    `https://picsum.photos/seed/${seed}/${w}/${h}`;

function withFallback(img, seed, w, h) {
    img.addEventListener("error", function handler() {
        img.removeEventListener("error", handler);
        img.src = fallback(seed, w, h);
    });
}

/* =========================================================
RENDER — VIDEOS
========================================================= */
(function renderVideos() {
    const grid = document.getElementById("videoGrid");
    grid.innerHTML = VIDEOS.map(
        (v) => `
    <article class="card vcard reveal" data-cat="${v.cat}" data-video="${v.id}"
             tabindex="0" role="button" aria-label="Play ${v.title}">
      <div class="vcard__thumb">
        <img data-yt-thumb="${v.id}" src="${ytThumb(v.id)}" alt="" loading="lazy">
        <span class="vcard__tag">${v.tag}</span>
        <span class="vcard__dur">${v.duration}</span>
        <span class="vcard__play" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </span>
      </div>
      <div class="vcard__body">
        <h3 class="vcard__title">${v.title}</h3>
        <div class="vcard__meta">
          <span>${v.views} views</span><i></i><span>${v.date}</span>
        </div>
      </div>
    </article>
  `,
    ).join("");

    grid.querySelectorAll("[data-yt-thumb]").forEach((img) => {
        const id = img.dataset.ytThumb;
        img.addEventListener("error", function h1() {
            img.removeEventListener("error", h1);
            img.src = ytThumbQ(id);
            img.addEventListener("error", function h2() {
                img.removeEventListener("error", h2);
                img.src = fallback("rf-vid-" + id, 800, 450);
            });
        });
    });
})();

/* =========================================================
RENDER — SHORTS
========================================================= */
(function renderShorts() {
    const rail = document.getElementById("shortsRail");
    rail.innerHTML = SHORTS.map(
        (s) => `
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
  `,
    ).join("");

    rail.querySelectorAll("[data-yt-thumb]").forEach((img) => {
        img.addEventListener("error", function h() {
            img.removeEventListener("error", h);
            img.src = fallback("rf-short-" + img.dataset.ytThumb, 600, 1067);
        });
    });
})();


/* =========================================================
RENDER — BLOG
========================================================= */
(function renderBlog() {
    const grid = document.getElementById("blogGrid");
    grid.innerHTML = POSTS.map(
        (p) => `
    <article class="card bcard reveal ${p.feature ? "bcard--feature" : ""}">
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
    </article>
  `,
    ).join("");

    grid
        .querySelectorAll("img")
        .forEach((img, i) => withFallback(img, "rf-blog-" + i, 900, 560));
})();

/* =========================================================
RENDER — STORE
========================================================= */
(function renderStore() {
    const grid = document.getElementById("storeGrid");
    grid.innerHTML = PRODUCTS.map(
        (p) => `
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
  `,
    ).join("");

    grid
        .querySelectorAll("img")
        .forEach((img, i) => withFallback(img, "rf-shop-" + i, 600, 600));
})();

/* =========================================================
HERO CAROUSEL
========================================================= */
(function heroCarousel() {
    const root = document.getElementById("heroCarousel");
    const track = document.getElementById("heroTrack");
    const slides = [...track.querySelectorAll("[data-slide]")];
    const dotsWrap = document.getElementById("heroDots");
    const progress = document.getElementById("heroProgress");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const DURATION = 7000;
    const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

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
        slides.forEach((s, i) =>
            s.classList.toggle("is-active", i === index),
        );
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
        if (reduce) return;
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
        progress.style.transition = "width .3s ease";
        progress.style.width = "0%";
    }

    function restart() {
        stop();
        start();
    }

    prevBtn.addEventListener("click", () => go(index - 1, true));
    nextBtn.addEventListener("click", () => go(index + 1, true));

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    root.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            prev();
            restart();
        }
        if (e.key === "ArrowRight") {
            e.preventDefault();
            next();
            restart();
        }
    });

    let touchX = 0,
        touchY = 0;
    root.addEventListener(
        "touchstart",
        (e) => {
            touchX = e.touches[0].clientX;
            touchY = e.touches[0].clientY;
        },
        { passive: true },
    );

    root.addEventListener(
        "touchend",
        (e) => {
            const dx = e.changedTouches[0].clientX - touchX;
            const dy = e.changedTouches[0].clientY - touchY;
            if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
                dx < 0 ? next() : prev();
                restart();
            }
        },
        { passive: true },
    );

    document.addEventListener("visibilitychange", () =>
        document.hidden ? stop() : start(),
    );

    render();
    start();
})();

/* =========================================================
SHORTS RAIL — coverflow + controls
========================================================= */
(function shortsRail() {
    const rail = document.getElementById("shortsRail");
    if (!rail) return;

    const cards = [...rail.querySelectorAll(".scard")];
    const progressBar = document.getElementById("railProgress");
    const prevBtn = document.getElementById("railPrev");
    const nextBtn = document.getElementById("railNext");

    /* Falloff = how wide the "center zone" is, in px.
 Larger = gentler tilt, smaller = sharper focus. */
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

        cards.forEach((card) => {
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

        cards.forEach((c) => c.classList.toggle("is-active", c === closest));

        /* Progress bar */
        if (progressBar) {
            const scrollMax = rail.scrollWidth - rail.clientWidth;
            const p = scrollMax > 0 ? rail.scrollLeft / scrollMax : 0;
            const barW =
                rail.scrollWidth > 0
                    ? (rail.clientWidth / rail.scrollWidth) * 100
                    : 100;
            progressBar.style.width = barW + "%";
            /* Move the fill along the track proportionally */
            progressBar.style.transform = `translateX(${p * ((100 - barW) / barW) * 100}%)`;
        }

        /* Arrow states */
        if (prevBtn) prevBtn.disabled = rail.scrollLeft <= 2;
        if (nextBtn)
            nextBtn.disabled =
                rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;
    }

    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            update();
            ticking = false;
        });
    }

    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", update);

    /* Arrow navigation */
    function step(dir) {
        const first = cards[0];
        if (!first) return;
        const styles = getComputedStyle(rail);
        const gap = parseFloat(styles.columnGap || styles.gap) || 20;
        rail.scrollBy({
            left: dir * (first.offsetWidth + gap),
            behavior: "smooth",
        });
    }
    if (prevBtn) prevBtn.addEventListener("click", () => step(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => step(1));

    /* Drag-to-scroll (mouse only — touch uses native) */
    let isDown = false,
        startX = 0,
        startScroll = 0,
        dragged = false;
    rail.addEventListener("pointerdown", (e) => {
        if (e.pointerType !== "mouse") return;
        isDown = true;
        dragged = false;
        startX = e.clientX;
        startScroll = rail.scrollLeft;
        rail.classList.add("is-dragging");
    });
    window.addEventListener("pointermove", (e) => {
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

    /* Suppress the click that follows a drag */
    rail.addEventListener(
        "click",
        (e) => {
            if (dragged) {
                e.preventDefault();
                e.stopPropagation();
                dragged = false;
            }
        },
        true,
    );

    /* Keyboard nav */
    rail.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
        }
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
        }
    });

    /* Initial paint */
    requestAnimationFrame(update);
})();

/* =========================================================
THEME TOGGLE
========================================================= */
(function themeController() {
    const toggle = document.getElementById("themeToggle");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    function readTheme() {
        return document.documentElement.getAttribute("data-theme") === "dark"
            ? "dark"
            : "light";
    }
    function syncToggle(theme) {
        toggle.setAttribute(
            "aria-pressed",
            theme === "dark" ? "true" : "false",
        );
        toggle.setAttribute(
            "aria-label",
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        );
    }
    function applyTheme(theme, persist) {
        document.documentElement.setAttribute("data-theme", theme);
        syncToggle(theme);
        if (persist !== false) {
            try {
                localStorage.setItem("rf-theme", theme);
            } catch (e) { }
        }
    }

    toggle.addEventListener("click", () => {
        applyTheme(readTheme() === "dark" ? "light" : "dark");
    });

    syncToggle(readTheme());

    /* Follow system changes only if user hasn't picked a theme */
    prefersDark.addEventListener("change", (e) => {
        let saved = null;
        try {
            saved = localStorage.getItem("rf-theme");
        } catch (err) { }
        if (!saved) applyTheme(e.matches ? "dark" : "light", false);
    });
})();

/* =========================================================
NAV — sticky, transparent over hero, solid on scroll
========================================================= */
const nav = document.getElementById("nav");
const navMenu = document.getElementById("navMenu");
const navToggle = document.getElementById("navToggle");
const navLinks = [...document.querySelectorAll(".nav__link")];
const heroEl = document.getElementById("home");

function updateNav() {
    const heroHeight = heroEl ? heroEl.offsetHeight : 600;
    const threshold = Math.max(heroHeight - 160, 120);
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

navLinks.forEach((a) =>
    a.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    }),
);

const spy = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                navLinks.forEach((l) =>
                    l.classList.toggle(
                        "active",
                        l.getAttribute("href") === "#" + e.target.id,
                    ),
                );
            }
        });
    },
    { rootMargin: "-45% 0px -50% 0px" },
);

document.querySelectorAll("section[id]").forEach((s) => spy.observe(s));

/* =========================================================
VIDEO FILTERS
========================================================= */
document.getElementById("videoFilters").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;

    document
        .querySelectorAll("#videoFilters .chip")
        .forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");

    const f = chip.dataset.filter;
    document.querySelectorAll(".vcard").forEach((card) => {
        const show = f === "all" || card.dataset.cat === f;
        card.classList.toggle("hide", !show);
    });
});

/* =========================================================
MODAL PLAYER
========================================================= */
const modal = document.getElementById("modal");
const player = document.getElementById("modalPlayer");

function openVideo(id, vertical = false) {
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
    modal.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    player.innerHTML = "";
}

document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-video]");
    if (card) {
        openVideo(card.dataset.video, card.dataset.vertical === "1");
        return;
    }
    if (e.target.closest("[data-close]")) closeVideo();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open"))
        closeVideo();

    if (
        (e.key === "Enter" || e.key === " ") &&
        document.activeElement?.dataset?.video
    ) {
        e.preventDefault();
        const el = document.activeElement;
        openVideo(el.dataset.video, el.dataset.vertical === "1");
    }
});

/* =========================================================
SCROLL REVEAL
========================================================= */
const revealObserver = new IntersectionObserver(
    (entries, obs) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${Math.min(i * 70, 340)}ms`;
                entry.target.classList.add("in");
                obs.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
);

document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));

/* =========================================================
TOAST
========================================================= */
const toast = document.getElementById("toast");
let toastTimer;

function showToast(html) {
    toast.innerHTML = html;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 4200);
}

/* =========================================================
FORMS
========================================================= */
document.getElementById("requestForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const first = form.name.value.trim().split(" ")[0];
    showToast(
        `<span><strong>Request sent!</strong> Thanks ${first} — I'll reply within 48 hours.</span>`,
    );
    form.reset();
});

document.getElementById("newsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    showToast(
        `<span><strong>You're in.</strong> Check your inbox to confirm.</span>`,
    );
    e.target.reset();
});

document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cart]");
    if (btn)
        showToast(`<span><strong>Added:</strong> ${btn.dataset.cart}</span>`);
});

/* =========================================================
MISC
========================================================= */
document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-yt]").forEach((a) => {
    a.href = CHANNEL_URL;
    a.target = "_blank";
    a.rel = "noopener";
});