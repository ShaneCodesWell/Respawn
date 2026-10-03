<x-layouts.app page="shop-product">
    @push('styles')
        @vite(['resources/css/shop.css', 'resources/css/prose.css'])
    @endpush
    <!-- ================= BREADCRUMB ================= -->
    <section style="padding: calc(var(--nav-h) + 40px) 0 0;">
        <div class="container">
            <p style="margin-bottom:0;">
                <a class="link-arrow" href="{{ route('shop.index') }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" style="transform:rotate(180deg);">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                    Back to shop
                </a>
            </p>
        </div>
    </section>

    <!-- ================= PRODUCT ================= -->
    <section class="section" style="padding-top: clamp(32px,5vw,56px);">
        <div class="container">
            <div class="product-layout">

                <!-- GALLERY -->
                <div class="product-gallery">
                    <div class="product-hero" id="productHero">
                        <img id="productHeroImg" src="https://picsum.photos/seed/respawn-shop-1/900/900" alt="">
                    </div>
                    <div class="product-thumbs" id="productThumbs">
                        <button class="product-thumb is-active"
                            data-img="https://picsum.photos/seed/respawn-shop-1/900/900">
                            <img src="https://picsum.photos/seed/respawn-shop-1/900/900" alt="">
                        </button>
                        <button class="product-thumb" data-img="https://picsum.photos/seed/respawn-shop-1b/900/900">
                            <img src="https://picsum.photos/seed/respawn-shop-1b/900/900" alt="">
                        </button>
                        <button class="product-thumb" data-img="https://picsum.photos/seed/respawn-shop-1c/900/900">
                            <img src="https://picsum.photos/seed/respawn-shop-1c/900/900" alt="">
                        </button>
                        <button class="product-thumb" data-img="https://picsum.photos/seed/respawn-shop-1d/900/900">
                            <img src="https://picsum.photos/seed/respawn-shop-1d/900/900" alt="">
                        </button>
                    </div>
                </div>

                <!-- INFO -->
                <div class="product-info">
                    <span class="product-cat">Apparel</span>
                    <h1 class="product-title">Respawn Forever Tee</h1>
                    <p class="product-tagline">A heavyweight cotton tee that survives laundry day, LAN parties, and the
                        occasional rage-quit.</p>

                    <div class="product-price">
                        <span class="product-price__amount">$28</span>
                        <span class="product-price__badge">New</span>
                    </div>

                    <div class="product-options">
                        <div>
                            <span class="product-option__label">Size</span>
                            <div class="product-option__values" id="sizeOptions">
                                <button class="size-chip" type="button">XS</button>
                                <button class="size-chip is-active" type="button">S</button>
                                <button class="size-chip" type="button">M</button>
                                <button class="size-chip" type="button">L</button>
                                <button class="size-chip" type="button">XL</button>
                                <button class="size-chip" type="button">2XL</button>
                            </div>
                        </div>
                    </div>

                    <div class="product-actions">
                        <div class="qty">
                            <button type="button" data-qty="dec" aria-label="Decrease quantity">−</button>
                            <input id="qtyInput" type="number" value="1" min="1" max="99"
                                aria-label="Quantity">
                            <button type="button" data-qty="inc" aria-label="Increase quantity">+</button>
                        </div>
                        <button class="btn btn--primary" id="addToCart" type="button" data-cart="Respawn Forever Tee">
                            Add to cart
                        </button>
                    </div>

                    <div class="product-meta">
                        <div class="product-meta__item">
                            <span class="product-meta__label">Ships</span>
                            <span class="product-meta__value">2–4 business days</span>
                        </div>
                        <div class="product-meta__item">
                            <span class="product-meta__label">Free shipping</span>
                            <span class="product-meta__value">Orders over $60</span>
                        </div>
                        <div class="product-meta__item">
                            <span class="product-meta__label">Returns</span>
                            <span class="product-meta__value">30-day money back</span>
                        </div>
                        <div class="product-meta__item">
                            <span class="product-meta__label">Made in</span>
                            <span class="product-meta__value">Small batches</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- ================= DESCRIPTION ================= -->
    <section class="section section--soft"
        style="padding-top:clamp(40px,5vw,64px); padding-bottom:clamp(40px,5vw,64px);">
        <div class="container">
            <div class="prose">
                <h2>About this product</h2>
                <p>
                    This isn't a print-on-demand tee you'll find on a drop-shipping site. It's
                    a proper heavyweight cotton shirt — 240gsm, pre-shrunk, garment-dyed, with
                    a print that actually survives the wash.
                </p>
                <ul>
                    <li>240gsm heavyweight cotton</li>
                    <li>Pre-shrunk, garment-dyed</li>
                    <li>Screen-printed front and sleeve detail</li>
                    <li>Regular fit — true to size</li>
                </ul>
                <p>
                    If you've bought merch from me before, you know the drill. If this is your
                    first order, welcome — you're going to like it.
                </p>
            </div>
        </div>
    </section>

    <!-- ================= RELATED ================= -->
    <section class="section">
        <div class="container">
            <div class="related">
                <div class="related__head">
                    <h2 class="related__title">You might also like</h2>
                    <a class="link-arrow" href="{{ route('shop.index') }}">
                        All products
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </a>
                </div>

                <div class="shop-grid" id="relatedGrid" data-limit="4" data-exclude="respawn-tee"></div>
            </div>
        </div>
    </section>
</x-layouts.app>
