{{-- resources/views/components/blog-card.blade.php --}}
@props(['post', 'feature' => false])

@php
    $img = $post->getFirstMediaUrl('featured_image');
    $catSlug = \Illuminate\Support\Str::slug($post->category ?? '');
    $search = mb_strtolower($post->title . ' ' . $post->excerpt . ' ' . $post->category);
@endphp

<a href="{{ route('blog.show', $post) }}"
   class="card bcard reveal {{ $feature ? 'bcard--feature' : '' }}"
   data-filterable
   data-cat="{{ $catSlug }}"
   data-search="{{ $search }}"
   data-title="{{ mb_strtolower($post->title) }}">
    <div class="bcard__art">
        @if ($img)
            <img src="{{ $img }}" alt="" loading="lazy">
        @endif
        @if ($post->category)
            <span class="bcard__cat" data-cat="{{ $catSlug }}">{{ $post->category }}</span>
        @endif
    </div>
    <div class="bcard__body">
        <span class="bcard__date">{{ $post->published_at->format('M d, Y') }}</span>
        <h3 class="bcard__title">{{ $post->title }}</h3>
        <p class="bcard__excerpt">{{ $post->excerpt }}</p>
        <div class="bcard__foot">
            <span>{{ $post->read_time }}</span>
            <span>Read →</span>
        </div>
    </div>
</a>