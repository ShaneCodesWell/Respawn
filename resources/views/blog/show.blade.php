@php
    $img = $post->getFirstMediaUrl('featured_image');
    $catSlug = \Illuminate\Support\Str::slug($post->category ?? '');
@endphp

<x-layouts.app page="blog-post" :title="$post->title . ' | Respawn Forever'" :description="$post->excerpt">
    @push('styles')
        @vite(['resources/css/blog.css', 'resources/css/prose.css'])
    @endpush

    <article>
        <!-- ================= POST HEAD ================= -->
        <section class="post-head">
            <div class="container post-head__inner">
                <p style="margin-bottom:1rem;">
                    <a class="link-arrow" href="{{ route('blog.index') }}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(180deg);">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                        Back to Journal
                    </a>
                </p>

                @if ($post->category)
                    <span class="post-cat bcard__cat" data-cat="{{ $catSlug }}">{{ $post->category }}</span>
                @endif

                <h1 class="post-title">{{ $post->title }}</h1>

                <div class="post-meta">
                    <span>{{ $post->published_at->format('M d, Y') }}</span>
                    <i></i>
                    <span>{{ $post->read_time }}</span>
                    <i></i>
                    <span>By Respawn Forever</span>
                </div>
            </div>
        </section>

        <!-- ================= POST HERO ================= -->
        @if ($img)
            <div class="container">
                <figure class="post-hero">
                    <img src="{{ $img }}" alt="{{ $post->title }}">
                </figure>
            </div>
        @endif

        <!-- ================= POST BODY ================= -->
        <section class="section" style="padding-top:0;">
            <div class="container">
                <div class="prose">
                    {!! $post->body !!}
                </div>

                <!-- ================= POST FOOTER ================= -->
                <div class="post-foot">
                    <span class="post-foot__label">Share this article</span>
                    <div class="post-share">
                        <a href="https://x.com/intent/post?text={{ urlencode($post->title) }}&url={{ urlencode(url()->current()) }}"
                            target="_blank" rel="noopener" aria-label="Share on X">
                            <svg viewBox="0 0 24 24">
                                <path d="M18.9 2H22l-7 8 8.2 12h-6.4l-5-7.3L6 22H2.9l7.5-8.6L2.5 2h6.6l4.5 6.7zm-1.1 18h1.8L7.3 3.8H5.4z" />
                            </svg>
                        </a>
                        <a href="#" data-copy-link aria-label="Copy link">
                            <svg viewBox="0 0 24 24">
                                <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 1 0-7-7l-1 1" />
                                <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 1 0 7 7l1-1" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- ================= POST CTA ================= -->
                <div class="post-cta">
                    <p>Enjoyed this? New posts every Monday.</p>
                    <a class="btn btn--primary" href="{{ route('blog.index') }}">Back to Journal</a>
                </div>
            </div>
        </section>
    </article>
</x-layouts.app>