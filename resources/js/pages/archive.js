/* =========================================================
   ARCHIVE HELPER — filter, search, sort, load-more
   Works on cards already rendered by Blade ([data-filterable])
   ========================================================= */
export function initArchive(cfg) {
    const grid = document.getElementById(cfg.gridId);
    if (!grid) return;

    const el = (id) => (id ? document.getElementById(id) : null);
    const filtersEl = el(cfg.filtersId);
    const searchEl = el(cfg.searchId);
    const sortEl = el(cfg.sortId);
    const loadMoreWrap = el(cfg.loadMoreWrapId);
    const loadMoreBtn = el(cfg.loadMoreBtnId);
    const loadMoreCount = el(cfg.loadMoreCountId);
    const emptyState = el(cfg.emptyId);
    const clearFilters = el(cfg.clearId);
    const totalCount = el(cfg.totalId);

    const items = [...grid.querySelectorAll("[data-filterable]")];
    items.forEach((item, i) => (item.dataset.index = i));

    const PAGE_SIZE = parseInt(grid.dataset.limit, 10) || cfg.pageSize || 9;
    const HAS_PAGING = !!loadMoreBtn;

    let activeCat = "all";
    let term = "";
    let sortKey = "new";
    let visible = PAGE_SIZE;

    const byIndex = (a, b) => a.dataset.index - b.dataset.index;

    function render() {
        const list = items.filter(
            (item) =>
                (activeCat === "all" || item.dataset.cat === activeCat) &&
                (!term || (item.dataset.search || "").includes(term)),
        );

        list.sort(cfg.sorters?.[sortKey] || byIndex);

        const limit = HAS_PAGING ? visible : list.length;

        items.forEach((item) => (item.hidden = true));
        list.forEach((item, i) => {
            grid.appendChild(item);
            item.hidden = i >= limit;
        });

        if (totalCount) totalCount.textContent = items.length;

        if (emptyState) {
            emptyState.hidden = list.length > 0;
            grid.hidden = list.length === 0;
        }

        if (HAS_PAGING && loadMoreWrap) {
            const shown = Math.min(limit, list.length);
            loadMoreWrap.hidden = shown >= list.length;
            if (loadMoreCount) {
                loadMoreCount.innerHTML = `<b>${shown}</b> of <b>${list.length}</b> ${cfg.noun}`;
            }
        }
    }

    filtersEl?.addEventListener("click", (e) => {
        const chip = e.target.closest(".chip");
        if (!chip) return;
        filtersEl.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        activeCat = chip.dataset.filter;
        visible = PAGE_SIZE;
        render();
    });

    if (searchEl) {
        let t;
        searchEl.addEventListener("input", () => {
            clearTimeout(t);
            t = setTimeout(() => {
                term = searchEl.value.trim().toLowerCase();
                visible = PAGE_SIZE;
                render();
            }, 140);
        });
    }

    sortEl?.addEventListener("change", () => {
        sortKey = sortEl.value;
        visible = PAGE_SIZE;
        render();
    });

    loadMoreBtn?.addEventListener("click", () => {
        visible += PAGE_SIZE;
        render();
    });

    clearFilters?.addEventListener("click", () => {
        activeCat = "all";
        term = "";
        sortKey = "new";
        visible = PAGE_SIZE;
        if (searchEl) searchEl.value = "";
        if (sortEl) sortEl.value = "new";
        filtersEl?.querySelectorAll(".chip").forEach((c) =>
            c.classList.toggle("active", c.dataset.filter === "all"),
        );
        render();
    });

    const filterBar = document.querySelector(".filter-bar");
    if (filterBar) {
        const updateBar = () => filterBar.classList.toggle("is-stuck", window.scrollY > 40);
        window.addEventListener("scroll", updateBar, { passive: true });
        updateBar();
    }

    render();
}

/* Reusable comparators */
export const byTitle = (a, b) => a.dataset.title.localeCompare(b.dataset.title);
export const byViewsDesc = (a, b) => b.dataset.views - a.dataset.views;