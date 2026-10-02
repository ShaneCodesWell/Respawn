<x-layouts.app>
    @push('styles')
        @vite('resources/css/videos.css')
    @endpush
    <!-- ================= PAGE HEAD ================= -->
    <section class="page-head">
        <div class="container">
            <p class="eyebrow">The full library</p>
            <h1 class="page-title">Every video, <em>one place</em></h1>
            <p class="page-desc">A growing archive of gameplay, reviews and highlight reels. Filter by category, search
                for a game, or just browse.</p>
            <div class="page-meta">
                <span><b id="totalCount">0</b> videos</span>
                <i class="meta-dot"></i>
                <span>Updated weekly</span>
            </div>
        </div>
    </section>

    <!-- ================= FILTER BAR ================= -->
    <div class="filter-bar">
        <div class="container filter-bar__inner">
            <div class="filters" id="videoFilters">
                <button class="chip active" data-filter="all">All</button>
                <button class="chip" data-filter="letsplay">Let's Play</button>
                <button class="chip" data-filter="review">Reviews</button>
                <button class="chip" data-filter="highlight">Highlights</button>
                <button class="chip" data-filter="guide">Guides</button>
            </div>

            <div class="filter-tools">
                <label class="search" aria-label="Search videos">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                    </svg>
                    <input id="videoSearch" type="search" placeholder="Search videos…" autocomplete="off">
                </label>

                <div class="sort">
                    <select id="videoSort" aria-label="Sort videos">
                        <option value="new">Newest</option>
                        <option value="popular">Most viewed</option>
                        <option value="az">A–Z</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <!-- ================= VIDEO GRID ================= -->
    <section class="section section--soft videos-results">
        <div class="container">
            <div class="vgrid" id="videoGrid" data-limit="9"></div>

            <div class="load-more-wrap" id="loadMoreWrap" hidden>
                <button class="btn btn--soft" id="loadMoreBtn" type="button">Load more videos</button>
                <span class="load-more-count" id="loadMoreCount"></span>
            </div>

            <div class="empty" id="emptyState" hidden>
                <p>No videos match your filters.</p>
                <span>Try a different category, or clear everything.</span>
                <button class="btn btn--soft btn--sm" id="clearFilters" type="button">Clear filters</button>
            </div>
        </div>
    </section>
</x-layouts.app>
