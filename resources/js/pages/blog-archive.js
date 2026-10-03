import { POSTS, fallback } from "../data.js";
/* =========================================================
   BLOG ARCHIVE — grid, filters, search, sort, pagination
   Used on: blog page
   ========================================================= */
(function blogArchive() {
    const grid = document.getElementById("blogGrid");
    if (!grid) return;

    const filtersEl = document.getElementById("blogFilters");
    const searchEl = document.getElementById("blogSearch");
    const sortEl = document.getElementById("blogSort");
    const loadMoreWrap = document.getElementById("blogLoadMoreWrap");
    const loadMoreBtn = document.getElementById("blogLoadMoreBtn");
    const loadMoreCount = document.getElementById("blogLoadMoreCount");
    const emptyState = document.getElementById("blogEmptyState");
    const clearFilters = document.getElementById("blogClearFilters");
    const totalCount = document.getElementById("blogTotalCount");

    const PAGE_SIZE = parseInt(grid.dataset.limit, 10) || 9;
    const HAS_PAGING = !!loadMoreBtn;

    let activeCat = "all";
    let searchTerm = "";
    let sortKey = "new";
    let visible = PAGE_SIZE;

    const slug = str => str.toLowerCase().replace(/\s+/g, "-");

    /* ---------- FILTER + SORT ---------- */
    function getList() {
        let list = POSTS.slice();

        if (activeCat !== "all") {
            list = list.filter(p => slug(p.cat) === activeCat);
        }

        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            list = list.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.excerpt.toLowerCase().includes(q) ||
                p.cat.toLowerCase().includes(q)
            );
        }

        if (sortKey === "old") {
            list.sort((a, b) => (a.dateRaw || 0) - (b.dateRaw || 0));
        } else if (sortKey === "az") {
            list.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            list.sort((a, b) => (b.dateRaw || 0) - (a.dateRaw || 0));
        }

        return list;
    }

    /* ---------- CARD MARKUP ---------- */
    function cardHTML(p, i) {
        return `
      <article class="card bcard reveal ${p.feature ? "bcard--feature" : ""}"
               data-cat="${slug(p.cat)}">
        <a href="${p.url}" aria-label="Read ${p.title}">
          <div class="bcard__art">
            <img data-blog-img="${i}" src="${p.img}" alt="" loading="lazy">
            <span class="bcard__cat" data-cat="${slug(p.cat)}">${p.cat}</span>
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
      </article>`;
    }

    /* ---------- IMAGE FALLBACK ---------- */
    function wireImages(scope) {
        scope.querySelectorAll("[data-blog-img]").forEach(img => {
            img.addEventListener("error", function h() {
                img.removeEventListener("error", h);
                img.src = fallback("rf-blog-" + img.dataset.blogImg, 900, 560);
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

    /* ---------- UI ---------- */
    function updateTotal() {
        if (totalCount) totalCount.textContent = POSTS.length;
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
                    `<b>${shownLength}</b> of <b>${filteredLength}</b> articles`;
            }
        }
    }

    /* ---------- RENDER ---------- */
    function renderFull() {
        const filtered = getList();
        const shown = filtered.slice(0, visible);

        grid.innerHTML = shown.map(cardHTML).join("");
        wireImages(grid);
        revealNew(grid);

        updateTotal();
        updateEmpty(filtered.length);
        updateLoadMore(filtered.length, shown.length);
    }

    function appendMore() {
        const filtered = getList();
        const prev = visible;
        visible += PAGE_SIZE;
        const shown = filtered.slice(0, visible);
        const newItems = shown.slice(prev);

        if (newItems.length) {
            const tmp = document.createElement("div");
            tmp.innerHTML = newItems.map((p, i) => cardHTML(p, prev + i)).join("");
            while (tmp.firstChild) grid.appendChild(tmp.firstChild);
            wireImages(grid);
            revealNew(grid);
        }
        updateLoadMore(filtered.length, shown.length);
    }

    /* ---------- CONTROLS ---------- */
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

    if (sortEl) {
        sortEl.addEventListener("change", () => {
            sortKey = sortEl.value;
            visible = PAGE_SIZE;
            renderFull();
        });
    }

    if (loadMoreBtn) loadMoreBtn.addEventListener("click", appendMore);

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

    /* ---------- STICKY BAR ---------- */
    const filterBar = document.querySelector(".filter-bar");
    if (filterBar) {
        function updateBar() {
            filterBar.classList.toggle("is-stuck", window.scrollY > 40);
        }
        window.addEventListener("scroll", updateBar, { passive: true });
        updateBar();
    }

    renderFull();
})();