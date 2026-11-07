{{-- resources/views/components/video-card.blade.php --}}
@props(['video'])

@php
    $id = $video->youtube_id;
    $tag = $video->tag_label ?: $video->category?->getLabel();
    $search = mb_strtolower($video->title . ' ' . $tag . ' ' . $video->category?->getLabel());
@endphp

<article class="card vcard reveal"
         data-filterable
         data-cat="{{ $video->category?->value }}"
         data-search="{{ $search }}"
         data-title="{{ mb_strtolower($video->title) }}"
         data-views="{{ $video->views_raw }}"
         data-video="{{ $id }}"
         tabindex="0" role="button" aria-label="Play {{ $video->title }}">
    <div class="vcard__thumb">
        <img src="https://i.ytimg.com/vi/{{ $id }}/maxresdefault.jpg"
             onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/{{ $id }}/hqdefault.jpg'"
             alt="" loading="lazy">
        @if ($tag)
            <span class="vcard__tag">{{ $tag }}</span>
        @endif
        @if ($video->duration)
            <span class="vcard__dur">{{ $video->duration }}</span>
        @endif
        <span class="vcard__play" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </span>
    </div>
    <div class="vcard__body">
        <h3 class="vcard__title">{{ $video->title }}</h3>
        <div class="vcard__meta">
            @if ($video->views)
                <span>{{ $video->views }} views</span><i></i>
            @endif
            <span>{{ $video->published_at?->diffForHumans() }}</span>
        </div>
    </div>
</article>