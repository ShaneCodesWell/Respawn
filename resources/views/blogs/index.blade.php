<x-layouts.app page="blog">
    @push('styles')
        @vite('resources/css/blog.css')
    @endpush
    <!-- ================= PAGE HEAD ================= -->
    <section class="page-head">
        <div class="container">
            <p class="eyebrow">The journal</p>
            <h1 class="page-title">Notes, thoughts &amp; <em>patch talk</em></h1>
            <p class="page-desc">Long-form takes, patch breakdowns and the stories behind the videos. No hot takes, just
                things I actually care about.</p>
            <div class="page-meta">
                <span><b id="blogTotalCount">0</b> articles</span>
                <i class="meta-dot"></i>
                <span>New post every Monday</span>
            </div>
        </div>
    </section>

    <!-- ================= FILTER BAR ================= -->
    <div class="filter-bar">
        <div class="container filter-bar__inner">
            <div class="filters" id="blogFilters">
                <button class="chip active" data-filter="all">All</button>
                <button class="chip" data-filter="patch-notes">Patch Notes</button>
                <button class="chip" data-filter="opinion">Opinion</button>
                <button class="chip" data-filter="guides">Guides</button>
                <button class="chip" data-filter="behind-the-scenes">Behind the Scenes</button>
                <button class="chip" data-filter="news">News</button>
            </div>

            <div class="filter-tools">
                <label class="search" aria-label="Search articles">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                    </svg>
                    <input id="blogSearch" type="search" placeholder="Search articles…" autocomplete="off">
                </label>

                <div class="sort">
                    <select id="blogSort" aria-label="Sort articles">
                        <option value="new">Newest</option>
                        <option value="old">Oldest</option>
                        <option value="az">A–Z</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <!-- ================= GRID ================= -->
    <section class="section section--soft videos-results">
        <div class="container">
            <div class="blog-grid" id="blogGrid" data-limit="9"></div>

            <div class="load-more-wrap" id="blogLoadMoreWrap" hidden>
                <button class="btn btn--soft" id="blogLoadMoreBtn" type="button">Load more articles</button>
                <span class="load-more-count" id="blogLoadMoreCount"></span>
            </div>

            <div class="empty" id="blogEmptyState" hidden>
                <p>No articles match your filters.</p>
                <span>Try a different category, or clear everything.</span>
                <button class="btn btn--soft btn--sm" id="blogClearFilters" type="button">Clear filters</button>
            </div>
        </div>
    </section>
</x-layouts.app>
