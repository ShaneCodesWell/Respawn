{{-- resources/views/components/product-card.blade.php --}}
@props(['product'])

@php
    $img = $product->getFirstMediaUrl('image');
    $soon = $product->status === \App\Enums\ProductStatus::ComingSoon;
    $price = $product->price !== null
        ? '$' . number_format($product->price, $product->price == floor($product->price) ? 0 : 2)
        : null;
    $search = mb_strtolower($product->name . ' ' . $product->subtitle);
@endphp

<article class="card pcard reveal"
         data-filterable
         data-cat="{{ $product->type->value }}"
         data-search="{{ $search }}"
         data-title="{{ mb_strtolower($product->name) }}"
         data-price="{{ (float) $product->price }}">
    <a href="{{ route('shop.show', $product) }}" class="pcard__art">
        @if ($img)
            <img src="{{ $img }}" alt="{{ $product->name }}" loading="lazy">
        @endif
        @if ($soon)
            <span class="pcard__badge">Coming soon</span>
        @elseif ($product->badge)
            <span class="pcard__badge">{{ $product->badge }}</span>
        @endif
        <span class="pcard__glyph">{{ \Illuminate\Support\Str::upper(\Illuminate\Support\Str::substr($product->name, 0, 3)) }}</span>
    </a>
    <div class="pcard__body">
        <h3 class="pcard__name">
            <a href="{{ route('shop.show', $product) }}">{{ $product->name }}</a>
        </h3>
        <p class="pcard__sub">{{ $product->subtitle }}</p>
        <div class="pcard__row">
            <span class="pcard__price">{{ $price ?? '—' }}</span>
            @if ($soon)
                <span class="btn btn--soft btn--sm" aria-disabled="true">Soon</span>
            @else
                <button class="btn btn--soft btn--sm" data-cart="{{ $product->name }}">Add</button>
            @endif
        </div>
    </div>
</article>