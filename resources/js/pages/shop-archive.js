import { initArchive, byTitle } from "./archive.js";

initArchive({
    gridId: "shopGrid",
    filtersId: "shopFilters",
    searchId: "shopSearch",
    sortId: "shopSort",
    loadMoreWrapId: "shopLoadMoreWrap",
    loadMoreBtnId: "shopLoadMoreBtn",
    loadMoreCountId: "shopLoadMoreCount",
    emptyId: "shopEmptyState",
    clearId: "shopClearFilters",
    totalId: "shopTotalCount",
    noun: "products",
    pageSize: 8,
    sorters: {
        "price-asc": (a, b) => a.dataset.price - b.dataset.price,
        "price-desc": (a, b) => b.dataset.price - a.dataset.price,
        az: byTitle,
    },
});