import { initArchive, byTitle, byViewsDesc } from "./archive.js";

initArchive({
    gridId: "videoGrid",
    filtersId: "videoFilters",
    searchId: "videoSearch",
    sortId: "videoSort",
    loadMoreWrapId: "loadMoreWrap",
    loadMoreBtnId: "loadMoreBtn",
    loadMoreCountId: "loadMoreCount",
    emptyId: "emptyState",
    clearId: "clearFilters",
    totalId: "totalCount",
    noun: "videos",
    pageSize: 9,
    sorters: { popular: byViewsDesc, az: byTitle },
});