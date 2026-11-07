{{-- resources/views/components/short-card.blade.php --}}
@props(['short'])

<article class="card scard"
         data-filterable
         data-search="{{ mb_strtolower($short->title) }}"
         data-title="{{ mb_strtolower($short->title) }}"
         data-views="{{ $short->views_raw }}"
         data-video="{{ $short->youtube_id }}"
         data-vertical="1"
         tabindex="0" role="button" aria-label="Play {{ $short->title }}">
    <div class="scard__thumb">
        <img src="https://i.ytimg.com/vi/{{ $short->youtube_id }}/hqdefault.jpg" alt="" loading="lazy">
        <div class="scard__scrim"></div>
        @if ($short->views)
            <span class="scard__views">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
                {{ $short->views }}
            </span>
        @endif
        <span class="scard__play" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </span>
        <div class="scard__info">
            <h3 class="scard__title">{{ $short->title }}</h3>
        </div>
    </div>
</article>