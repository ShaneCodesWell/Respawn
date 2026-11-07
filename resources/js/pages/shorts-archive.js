import { initArchive, byTitle, byViewsDesc } from "./archive.js";

initArchive({
    gridId: "shortsGrid",
    searchId: "shortsSearch",
    sortId: "shortsSort",
    loadMoreWrapId: "shortsLoadMoreWrap",
    loadMoreBtnId: "shortsLoadMoreBtn",
    loadMoreCountId: "shortsLoadMoreCount",
    emptyId: "shortsEmptyState",
    clearId: "shortsClearFilters",
    totalId: "shortsTotalCount",
    noun: "shorts",
    pageSize: 12,
    sorters: { popular: byViewsDesc, az: byTitle },
});