<x-layouts.app page="shop">
    @push('styles')
        @vite('resources/css/shop.css')
    @endpush

    <!-- ================= PAGE HEAD ================= -->
    <section class="page-head">
        <div class="container">
            <p class="eyebrow">The shop</p>
            <h1 class="page-title">Merch &amp; <em>digital goods</em></h1>
            <p class="page-desc">Apparel, accessories and creator packs. Everything is made in small batches — no
                drop-ship junk, no print-on-demand mediocrity.</p>
            <div class="page-meta">
                <span><b id="shopTotalCount">0</b> products</span>
                <i class="meta-dot"></i>
                <span>Free shipping over $60</span>
            </div>
        </div>
    </section>

    <!-- ================= FILTER BAR ================= -->
    <div class="filter-bar">
        <div class="container filter-bar__inner">
            <div class="filters" id="shopFilters">
                <button class="chip active" data-filter="all">All</button>
                <button class="chip" data-filter="apparel">Apparel</button>
                <button class="chip" data-filter="accessories">Accessories</button>
                <button class="chip" data-filter="digital">Digital</button>
            </div>

            <div class="filter-tools">
                <label class="search" aria-label="Search products">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-3.5-3.5" />
                    </svg>
                    <input id="shopSearch" type="search" placeholder="Search products…" autocomplete="off">
                </label>

                <div class="sort">
                    <select id="shopSort" aria-label="Sort products">
                        <option value="new">Featured</option>
                        <option value="price-asc">Price: low to high</option>
                        <option value="price-desc">Price: high to low</option>
                        <option value="az">A–Z</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <!-- ================= GRID ================= -->
    <section class="section section--soft videos-results">
        <div class="container">
            <div class="shop-grid" id="shopGrid" data-limit="8"></div>

            <div class="load-more-wrap" id="shopLoadMoreWrap" hidden>
                <button class="btn btn--soft" id="shopLoadMoreBtn" type="button">Load more products</button>
                <span class="load-more-count" id="shopLoadMoreCount"></span>
            </div>

            <div class="empty" id="shopEmptyState" hidden>
                <p>No products match your filters.</p>
                <span>Try a different category, or clear everything.</span>
                <button class="btn btn--soft btn--sm" id="shopClearFilters" type="button">Clear filters</button>
            </div>
        </div>
    </section>
</x-layouts.app>
