<x-layouts.app page="videos">
    @push('styles')
        @vite('resources/css/archive.css')
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
                @foreach ($videoCategories as $cat)
                    <button class="chip" data-filter="{{ $cat->value }}">{{ $cat->getLabel() }}</button>
                @endforeach
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
            @if ($videos->isEmpty())
                <div class="empty">
                    <p>No videos yet.</p>
                    <span>New uploads are on the way. Check back soon.</span>
                </div>
            @else
                <div class="vgrid" id="videoGrid" data-limit="9">
                    @foreach ($videos as $video)
                        <x-video-card :video="$video" />
                    @endforeach
                </div>
            @endif

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
