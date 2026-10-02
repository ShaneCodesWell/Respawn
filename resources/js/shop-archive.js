/* =========================================================
   SHOP ARCHIVE — grid, filters, search, sort, pagination
   Used on: shop.html
   ========================================================= */
(function shopArchive() {
    const grid = document.getElementById("shopGrid");
    if (!grid) return;

    const filtersEl = document.getElementById("shopFilters");
    const searchEl = document.getElementById("shopSearch");
    const sortEl = document.getElementById("shopSort");
    const loadMoreWrap = document.getElementById("shopLoadMoreWrap");
    const loadMoreBtn = document.getElementById("shopLoadMoreBtn");
    const loadMoreCount = document.getElementById("shopLoadMoreCount");
    const emptyState = document.getElementById("shopEmptyState");
    const clearFilters = document.getElementById("shopClearFilters");
    const totalCount = document.getElementById("shopTotalCount");

    const PAGE_SIZE = parseInt(grid.dataset.limit, 10) || 8;
    const HAS_PAGING = !!loadMoreBtn;

    let activeCat = "all";
    let searchTerm = "";
    let sortKey = "new";
    let visible = PAGE_SIZE;

    /* ---------- FILTER + SORT ---------- */
    function getList() {
        let list = PRODUCTS.slice();

        if (activeCat !== "all") {
            list = list.filter(p => p.cat === activeCat);
        }

        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            list = list.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.sub.toLowerCase().includes(q)
            );
        }

        if (sortKey === "price-asc") {
            list.sort((a, b) => a.priceRaw - b.priceRaw);
        } else if (sortKey === "price-desc") {
            list.sort((a, b) => b.priceRaw - a.priceRaw);
        } else if (sortKey === "az") {
            list.sort((a, b) => a.name.localeCompare(b.name));
        }

        return list;
    }

    /* ---------- CARD MARKUP ---------- */
    function cardHTML(p) {
        return `
      <article class="card pcard reveal" data-cat="${p.cat}">
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
      </article>`;
    }

    /* ---------- IMAGE FALLBACK ---------- */
    function wireImages(scope) {
        scope.querySelectorAll("[data-shop-img]:not([data-wired])").forEach(img => {
            img.dataset.wired = "1";
            img.addEventListener("error", function h() {
                img.removeEventListener("error", h);
                img.src = fallback("rf-shop-" + img.dataset.shopImg, 600, 600);
            });
        });
    }

    /* ---------- REVEAL ---------- */
    let revealObs = null;
    if ("IntersectionObserver" in window) {
        revealObs = new IntersectionObserver((entries, o) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = `${Math.min(i * 60, 300)}ms`;
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
        if (totalCount) totalCount.textContent = PRODUCTS.length;
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
                    `<b>${shownLength}</b> of <b>${filteredLength}</b> products`;
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
            tmp.innerHTML = newItems.map(cardHTML).join("");
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