/* =========================================================
   VIDEO GRID — render, filters, search, sort, pagination
   Used on: index.html (limited to 6), videos.html (full)
   ========================================================= */
(function videoGrid() {
    const grid = document.getElementById("videoGrid");
    if (!grid) return;

    const filtersEl = document.getElementById("videoFilters");
    const searchEl = document.getElementById("videoSearch");
    const sortEl = document.getElementById("videoSort");
    const loadMoreWrap = document.getElementById("loadMoreWrap");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const loadMoreCount = document.getElementById("loadMoreCount");
    const emptyState = document.getElementById("emptyState");
    const clearFilters = document.getElementById("clearFilters");
    const totalCount = document.getElementById("totalCount");

    const PAGE_SIZE = parseInt(grid.dataset.limit, 10) || 9;
    const HAS_TOOLS = !!searchEl || !!sortEl;
    const HAS_PAGING = !!loadMoreBtn;

    /* ---------- STATE ---------- */
    let activeCat = "all";
    let searchTerm = "";
    let sortKey = "new";
    let visible = PAGE_SIZE;

    /* ---------- FILTER + SORT ---------- */
    function getList() {
        let list = VIDEOS.slice();

        if (activeCat !== "all") {
            list = list.filter(v => v.cat === activeCat);
        }

        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            list = list.filter(v =>
                v.title.toLowerCase().includes(q) ||
                (v.tag || "").toLowerCase().includes(q) ||
                (v.cat || "").toLowerCase().includes(q)
            );
        }

        if (sortKey === "popular") {
            list.sort((a, b) => (b.viewsRaw || 0) - (a.viewsRaw || 0));
        } else if (sortKey === "az") {
            list.sort((a, b) => a.title.localeCompare(b.title));
        }
        /* "new" = original array order */

        return list;
    }

    /* ---------- CARD MARKUP ---------- */
    function cardHTML(v) {
        return `
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
      </article>`;
    }

    /* ---------- THUMBNAIL FALLBACKS ---------- */
    function wireThumbs(scope) {
        scope.querySelectorAll("[data-yt-thumb]:not([data-wired])").forEach(img => {
            img.dataset.wired = "1";
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
    }

    /* ---------- REVEAL ---------- */
    let revealObs = null;
    if ("IntersectionObserver" in window) {
        revealObs = new IntersectionObserver((entries, o) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = `${Math.min(i * 70, 340)}ms`;
                    entry.target.classList.add("in");
                    o.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    }
    function revealNew(scope) {
        if (!revealObs) return;
        scope.querySelectorAll(".reveal:not(.in):not([data-observed])").forEach(el => {
            el.dataset.observed = "1";
            revealObs.observe(el);
        });
    }

    /* ---------- UI UPDATES ---------- */
    function updateTotal() {
        if (totalCount) totalCount.textContent = VIDEOS.length;
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
                    `<b>${shownLength}</b> of <b>${filteredLength}</b> videos`;
            }
        }
    }

    /* ---------- RENDER ---------- */
    function renderFull() {
        const filtered = getList();
        const shown = filtered.slice(0, visible);

        grid.innerHTML = shown.map(cardHTML).join("");
        wireThumbs(grid);
        revealNew(grid);

        updateTotal();
        updateEmpty(filtered.length);
        updateLoadMore(filtered.length, shown.length);

        /* If nothing to load (no pagination), don't reset scroll */
        if (!HAS_PAGING && filtered.length > 0) visible = filtered.length;
    }

    function appendMore() {
        const filtered = getList();
        const prev = visible;
        visible += PAGE_SIZE;
        const shown = filtered.slice(0, visible);
        const newCards = shown.slice(prev);

        if (newCards.length) {
            const tmp = document.createElement("div");
            tmp.innerHTML = newCards.map(cardHTML).join("");
            while (tmp.firstChild) grid.appendChild(tmp.firstChild);
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

            filtersEl.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
            chip.classList.add("active");

            activeCat = chip.dataset.filter;
            visible = PAGE_SIZE;
            renderFull();
        });
    }

    /* ---------- SEARCH (with debounce) ---------- */
    if (searchEl) {
        let t;
        searchEl.addEventListener("input", () => {
            clearTimeout(t);
            t = setTimeout(() => {
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

    /* ---------- CLEAR FILTERS (from empty state) ---------- */
    if (clearFilters) {
        clearFilters.addEventListener("click", () => {
            activeCat = "all";
            searchTerm = "";
            sortKey = "new";
            visible = PAGE_SIZE;

            if (searchEl) searchEl.value = "";
            if (sortEl) sortEl.value = "new";
            if (filtersEl) {
                filtersEl.querySelectorAll(".chip").forEach(c =>
                    c.classList.toggle("active", c.dataset.filter === "all"));
            }
            renderFull();
        });
    }

    /* ---------- STICKY FILTER BAR ---------- */
    const filterBar = document.querySelector(".filter-bar");
    if (filterBar) {
        function updateBar() {
            filterBar.classList.toggle("is-stuck", window.scrollY > 40);
        }
        window.addEventListener("scroll", updateBar, { passive: true });
        updateBar();
    }

    /* ---------- INITIAL RENDER ---------- */
    renderFull();
})();