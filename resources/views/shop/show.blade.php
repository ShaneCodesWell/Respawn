@php
    $img = $product->getFirstMediaUrl('image');
    $soon = $product->status === \App\Enums\ProductStatus::ComingSoon;
    $isService = $product->type === \App\Enums\ProductType::Service;
    $isPhysical = $product->type === \App\Enums\ProductType::Physical;
    $outOfStock = $isPhysical && $product->stock !== null && $product->stock < 1;
@endphp

<x-layouts.app page="shop-product" :title="$product->name . ' | Respawn Forever'" :description="$product->subtitle">
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

                <!-- GALLERY (one image for now) -->
                <div class="product-gallery">
                    <div class="product-hero" id="productHero">
                        @if ($img)
                            <img id="productHeroImg" src="{{ $img }}" alt="{{ $product->name }}">
                        @endif
                    </div>
                </div>

                <!-- INFO -->
                <div class="product-info">
                    <span class="product-cat">{{ $product->type->getLabel() }}</span>
                    <h1 class="product-title">{{ $product->name }}</h1>
                    @if ($product->subtitle)
                        <p class="product-tagline">{{ $product->subtitle }}</p>
                    @endif

                    <div class="product-price">
                        @if ($product->price !== null)
                            <span
                                class="product-price__amount">${{ number_format($product->price, $product->price == floor($product->price) ? 0 : 2) }}</span>
                        @endif
                        @if ($soon)
                            <span class="product-price__badge">Coming soon</span>
                        @elseif ($product->badge)
                            <span class="product-price__badge">{{ $product->badge }}</span>
                        @endif
                    </div>

                    <div class="product-actions">
                        @if ($soon)
                            <span class="btn btn--soft" aria-disabled="true">Coming soon</span>
                        @elseif ($isService)
                            <a class="btn btn--primary" href="{{ route('home.index') }}#hire">Request this</a>
                        @elseif ($outOfStock)
                            <span class="btn btn--soft" aria-disabled="true">Out of stock</span>
                        @else
                            <div class="qty">
                                <button type="button" data-qty="dec" aria-label="Decrease quantity">−</button>
                                <input id="qtyInput" type="number" value="1" min="1"
                                    max="{{ $isPhysical && $product->stock ? $product->stock : 99 }}"
                                    aria-label="Quantity">
                                <button type="button" data-qty="inc" aria-label="Increase quantity">+</button>
                            </div>
                            <button class="btn btn--primary" id="addToCart" type="button"
                                data-cart="{{ $product->name }}">
                                Add to cart
                            </button>
                        @endif
                    </div>

                    @if ($isPhysical)
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
                    @endif
                </div>

            </div>
        </div>
    </section>

    <!-- ================= DESCRIPTION ================= -->
    @if ($product->description)
        <section class="section section--soft"
            style="padding-top:clamp(40px,5vw,64px); padding-bottom:clamp(40px,5vw,64px);">
            <div class="container">
                <div class="prose">
                    <h2>About this product</h2>
                    {!! nl2br(e($product->description)) !!}
                </div>
            </div>
        </section>
    @endif

    <!-- ================= RELATED ================= -->
    @if ($related->isNotEmpty())
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

                    <div class="shop-grid" id="relatedGrid">
                        @foreach ($related as $item)
                            <x-product-card :product="$item" />
                        @endforeach
                    </div>
                </div>
            </div>
        </section>
    @endif
</x-layouts.app>
