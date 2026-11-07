<x-layouts.app page="shorts">
    @push('styles')
        @vite('resources/css/archive.css')
        @vite('resources/css/shorts.css')
    @endpush
    <!-- ================= PAGE HEAD ================= -->
    <section class="page-head">
        <div class="container">
            <p class="eyebrow">Quick hits</p>
            <h1 class="page-title">Shorts &amp; <em>clips</em></h1>
            <p class="page-desc">Sixty seconds or less. Funny moments, clutch plays and the occasional tip that
                actually works.</p>
            <div class="page-meta">
                <span><b id="shortsTotalCount">0</b> shorts</span>
                <i class="meta-dot"></i>
                <span>New drops daily</span>
            </div>
        </div>
    </section>

    <!-- ================= FILTER BAR ================= -->
    <div class="filter-bar">
        <div class="container filter-bar__inner">
            <div class="filter-tools">
                <label class="search" aria-label="Search shorts">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                    </svg>
                    <input id="shortsSearch" type="search" placeholder="Search shorts…" autocomplete="off">
                </label>

                <div class="sort">
                    <select id="shortsSort" aria-label="Sort shorts">
                        <option value="new">Newest</option>
                        <option value="popular">Most viewed</option>
                        <option value="az">A–Z</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <!-- ================= GRID ================= -->
    <section class="section section--soft videos-results">
        <div class="container">
            @if ($shorts->isEmpty())
                <div class="empty">
                    <p>No shorts yet.</p>
                    <span>New drops are coming. Check back soon.</span>
                </div>
            @else
                <div class="shorts-grid" id="shortsGrid" data-limit="12">
                    @foreach ($shorts as $short)
                        <x-short-card :short="$short" />
                    @endforeach
                </div>
            @endif

            <div class="load-more-wrap" id="shortsLoadMoreWrap" hidden>
                <button class="btn btn--soft" id="shortsLoadMoreBtn" type="button">Load more shorts</button>
                <span class="load-more-count" id="shortsLoadMoreCount"></span>
            </div>

            <div class="empty" id="shortsEmptyState" hidden>
                <p>No shorts match your filters.</p>
                <span>Try a different category, or clear everything.</span>
                <button class="btn btn--soft btn--sm" id="shortsClearFilters" type="button">Clear filters</button>
            </div>
        </div>
    </section>
</x-layouts.app>
