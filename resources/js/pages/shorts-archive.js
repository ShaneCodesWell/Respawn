import { SHORTS, ytThumbQ, fallback } from "../data.js";

/* =========================================================
   SHORTS ARCHIVE — render, filters, search, sort, pagination
   Used on: shorts archive page
   ========================================================= */

(function shortsArchive() {
    const grid = document.getElementById("shortsGrid");
    if (!grid) return;

    const filtersEl = document.getElementById("shortsFilters");
    const searchEl = document.getElementById("shortsSearch");
    const sortEl = document.getElementById("shortsSort");
    const loadMoreWrap = document.getElementById("shortsLoadMoreWrap");
    const loadMoreBtn = document.getElementById("shortsLoadMoreBtn");
    const loadMoreCount = document.getElementById("shortsLoadMoreCount");
    const emptyState = document.getElementById("shortsEmptyState");
    const clearFilters = document.getElementById("shortsClearFilters");
    const totalCount = document.getElementById("shortsTotalCount");

    const PAGE_SIZE = parseInt(grid.dataset.limit, 10) || 12;
    const HAS_PAGING = !!loadMoreBtn;

    /* ---------- STATE ---------- */
    let activeCat = "all";
    let searchTerm = "";
    let sortKey = "new";
    let visible = PAGE_SIZE;

    /* ---------- FILTER + SORT ---------- */
    function getList() {
        let list = SHORTS.slice();

        if (activeCat !== "all") {
            list = list.filter(s => s.cat === activeCat);
        }

        if (searchTerm) {
            const q = searchTerm.toLowerCase();

            list = list.filter(s =>
                s.title.toLowerCase().includes(q) ||
                (s.tag || "").toLowerCase().includes(q) ||
                (s.cat || "").toLowerCase().includes(q)
            );
        }

        if (sortKey === "popular") {
            list.sort((a, b) =>
                (b.viewsRaw || 0) - (a.viewsRaw || 0)
            );
        } else if (sortKey === "az") {
            list.sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        }

        /* "new" = original array order */

        return list;
    }

    /* ---------- CARD MARKUP ---------- */
    function cardHTML(s) {
        return `
            <article
                class="card scard"
                data-cat="${s.cat || ""}"
                data-video="${s.id}"
                data-vertical="1"
                tabindex="0"
                role="button"
                aria-label="Play ${s.title}"
            >
                <div class="scard__thumb">
                    <img
                        data-yt-thumb="${s.id}"
                        src="${ytThumbQ(s.id)}"
                        alt=""
                        loading="lazy"
                    >

                    <div class="scard__scrim"></div>

                    <span class="scard__views">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                        ${s.views}
                    </span>

                    <span class="scard__play" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </span>

                    <div class="scard__info">
                        <h3 class="scard__title">${s.title}</h3>
                    </div>
                </div>
            </article>
        `;
    }

    /* ---------- THUMBNAIL FALLBACKS ---------- */
    function wireThumbs(scope) {
        scope
            .querySelectorAll("[data-yt-thumb]:not([data-wired])")
            .forEach(img => {
                img.dataset.wired = "1";

                const id = img.dataset.ytThumb;

                img.addEventListener("error", function h1() {
                    img.removeEventListener("error", h1);

                    img.src = fallback(
                        "rf-short-" + id,
                        600,
                        1067
                    );
                });
            });
    }

    /* ---------- REVEAL ---------- */
    let revealObs = null;

    if ("IntersectionObserver" in window) {
        revealObs = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        entry.target.style.transitionDelay =
                            `${Math.min(i * 70, 340)}ms`;

                        entry.target.classList.add("in");

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );
    }

    function revealNew(scope) {
        if (!revealObs) return;

        scope
            .querySelectorAll(".reveal:not(.in):not([data-observed])")
            .forEach(el => {
                el.dataset.observed = "1";
                revealObs.observe(el);
            });
    }

    /* ---------- UI UPDATES ---------- */
    function updateTotal() {
        if (totalCount) {
            totalCount.textContent = SHORTS.length;
        }
    }

    function updateEmpty(filteredLength) {
        if (!emptyState) return;

        const isEmpty = filteredLength === 0;

        emptyState.hidden = !isEmpty;
        grid.hidden = isEmpty;
    }

    function updateLoadMore(filteredLength, shownLength) {
        if (!HAS_PAGING || !loadMoreWrap) return;

        if (shownLength >= filteredLength) {
            loadMoreWrap.hidden = true;
        } else {
            loadMoreWrap.hidden = false;

            if (loadMoreCount) {
                loadMoreCount.innerHTML =
                    `<b>${shownLength}</b> of <b>${filteredLength}</b> shorts`;
            }
        }
    }

    /* ---------- RENDER ---------- */
    function renderFull() {
        const filtered = getList();
        const shown = filtered.slice(0, visible);

        grid.innerHTML = shown
            .map(cardHTML)
            .join("");

        wireThumbs(grid);
        revealNew(grid);

        updateTotal();
        updateEmpty(filtered.length);
        updateLoadMore(filtered.length, shown.length);

        /*
         * If there is no pagination, show everything.
         */
        if (!HAS_PAGING && filtered.length > 0) {
            visible = filtered.length;
        }
    }

    /* ---------- LOAD MORE ---------- */
    function appendMore() {
        const filtered = getList();

        const previousVisible = visible;

        visible += PAGE_SIZE;

        const shown = filtered.slice(0, visible);
        const newCards = shown.slice(previousVisible);

        if (newCards.length) {
            const temp = document.createElement("div");

            temp.innerHTML = newCards
                .map(cardHTML)
                .join("");

            while (temp.firstChild) {
                grid.appendChild(temp.firstChild);
            }

            wireThumbs(grid);
            revealNew(grid);
        }

        updateLoadMore(filtered.length, shown.length);
    }

    /* ---------- FILTERS ---------- */
    if (filtersEl) {
        filtersEl.addEventListener("click", e => {
            const chip = e.target.closest(".chip");

            if (!chip) return;

            filtersEl
                .querySelectorAll(".chip")
                .forEach(c => c.classList.remove("active"));

            chip.classList.add("active");

            activeCat = chip.dataset.filter;

            visible = PAGE_SIZE;

            renderFull();
        });
    }

    /* ---------- SEARCH ---------- */
    if (searchEl) {
        let timer;

        searchEl.addEventListener("input", () => {
            clearTimeout(timer);

            timer = setTimeout(() => {
                searchTerm = searchEl.value.trim();

                visible = PAGE_SIZE;

                renderFull();
            }, 140);
        });
    }

    /* ---------- SORT ---------- */
    if (sortEl) {
        sortEl.addEventListener("change", () => {
            sortKey = sortEl.value;

            visible = PAGE_SIZE;

            renderFull();
        });
    }

    /* ---------- LOAD MORE ---------- */
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", appendMore);
    }

    /* ---------- CLEAR FILTERS ---------- */
    if (clearFilters) {
        clearFilters.addEventListener("click", () => {
            activeCat = "all";
            searchTerm = "";
            sortKey = "new";
            visible = PAGE_SIZE;

            if (searchEl) {
                searchEl.value = "";
            }

            if (sortEl) {
                sortEl.value = "new";
            }

            if (filtersEl) {
                filtersEl
                    .querySelectorAll(".chip")
                    .forEach(c =>
                        c.classList.toggle(
                            "active",
                            c.dataset.filter === "all"
                        )
                    );
            }

            renderFull();
        });
    }

    /* ---------- INITIAL RENDER ---------- */
    renderFull();
})();