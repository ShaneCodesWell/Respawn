import { initArchive, byTitle } from "./archive.js";

initArchive({
    gridId: "blogGrid",
    filtersId: "blogFilters",
    searchId: "blogSearch",
    sortId: "blogSort",
    loadMoreWrapId: "blogLoadMoreWrap",
    loadMoreBtnId: "blogLoadMoreBtn",
    loadMoreCountId: "blogLoadMoreCount",
    emptyId: "blogEmptyState",
    clearId: "blogClearFilters",
    totalId: "blogTotalCount",
    noun: "articles",
    pageSize: 9,
    sorters: {
        old: (a, b) => b.dataset.index - a.dataset.index, // server sends newest first, so reverse it
        az: byTitle,
    },
});