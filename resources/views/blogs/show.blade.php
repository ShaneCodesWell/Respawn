<x-layouts.app page="blog-post">
    @push('styles')
        @vite(['resources/css/archive.css', 'resources/css/blog.css'])
    @endpush
    <!-- ================= POST HEAD ================= -->
    <article>
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

                <span class="post-cat bcard__cat" data-cat="patch-notes">Patch Notes</span>

                <h1 class="post-title">The Big Update Changed Everything — Here's What Actually Matters</h1>

                <div class="post-meta">
                    <span>Mar 14, 2026</span>
                    <i></i>
                    <span>8 min read</span>
                    <i></i>
                    <span>By Respawn Forever</span>
                </div>
            </div>
        </section>

        <!-- ================= POST HERO ================= -->
        <div class="container">
            <figure class="post-hero">
                <img src="https://picsum.photos/seed/respawn-blog-a/1600/800" alt="">
            </figure>
        </div>

        <!-- ================= POST BODY ================= -->
        <section class="section" style="padding-top:0;">
            <div class="container">
                <div class="prose">
                    <p>
                        The new season dropped last Tuesday and it rewrote half the meta. I've spent
                        roughly 40 hours since testing builds, tracking patch notes, and running
                        comparisons in private lobbies — and here's the short version: most of what
                        you read on day one was wrong.
                    </p>

                    <p>
                        This isn't a full breakdown. That's on the channel. This is the readable
                        version for people who want to understand <em>why</em> the changes matter
                        rather than just memorising a tier list.
                    </p>

                    <h2>What actually changed</h2>

                    <p>
                        Three systems got touched: movement, recoil, and the perk economy. Movement
                        is the headline — but it's also the least impactful change in practice.
                        Here's why.
                    </p>

                    <blockquote>
                        Most players will feel the movement change for about a week, then forget it
                        was ever different. The recoil change is the one that will decide matches
                        six months from now.
                    </blockquote>

                    <h3>1. Movement</h3>

                    <p>
                        The new slide-cancel window is roughly 12% tighter than before, which
                        sounds drastic until you realise the old window was already too generous.
                        In practice, most players won't notice unless they were abusing the mechanic
                        in high-level play — and if they were, this is a nerf they deserved.
                    </p>

                    <h3>2. Recoil</h3>

                    <p>
                        This is the big one. Every automatic weapon now has a steeper initial
                        vertical climb but a flatter horizontal pattern. In plain English: it's
                        harder to spray and pray, but easier to control a burst. That's a huge
                        shift toward precision play — and it means the top-tier weapons from last
                        season are no longer the top-tier weapons of this one.
                    </p>

                    <h3>3. Perk economy</h3>

                    <p>
                        Perk costs went up across the board, but the ones that matter most only
                        went up slightly. The net effect is that you can still run a strong build,
                        but you have to make real choices instead of stacking everything you want.
                    </p>

                    <h2>What this means for you</h2>

                    <ul>
                        <li>If you were a spray-and-pray player, you're going to have a rough two weeks.</li>
                        <li>If you were already playing precision, you just got a free buff.</li>
                        <li>If you weren't sure which one you were — play ten matches and you'll find out fast.</li>
                    </ul>

                    <p>
                        The full breakdown, with specific builds and side-by-side testing, is on
                        the channel. If you want the short version: <strong>slow down, aim more,
                            spray less</strong>. That's it.
                    </p>

                    <hr>

                    <p>
                        Next week I'll be covering the perk system in more detail, including a
                        spreadsheet of the new optimal builds for each class. If you want early
                        access, <a href="{{ route('work-with-me.index') }}">join the mailing list</a>.
                    </p>
                </div>

                <!-- ================= POST FOOTER ================= -->
                <div class="post-foot">
                    <span class="post-foot__label">Share this article</span>
                    <div class="post-share">
                        <a href="#" aria-label="Share on X"><svg viewBox="0 0 24 24">
                                <path
                                    d="M18.9 2H22l-7 8 8.2 12h-6.4l-5-7.3L6 22H2.9l7.5-8.6L2.5 2h6.6l4.5 6.7zm-1.1 18h1.8L7.3 3.8H5.4z" />
                            </svg></a>
                        <a href="#" aria-label="Share on Discord"><svg viewBox="0 0 24 24">
                                <path
                                    d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.3.5a14.6 14.6 0 0 1 4.3 2.2 16.7 16.7 0 0 0-14.8 0A14.6 14.6 0 0 1 8.9 3.5L8.6 3a19.8 19.8 0 0 0-4.9 1.4C.8 9.3-.1 14.1.3 18.8A19.9 19.9 0 0 0 6.4 22l.8-1.3a12.6 12.6 0 0 1-2.3-1.1l.5-.4a14.3 14.3 0 0 0 12.2 0l.5.4a12.6 12.6 0 0 1-2.3 1.1l.8 1.3a19.9 19.9 0 0 0 6.1-3.2c.5-5.4-.9-10.2-2.4-14.4zM8.4 15.4c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4zm7.2 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4z" />
                            </svg></a>
                        <a href="#" aria-label="Copy link"><svg viewBox="0 0 24 24">
                                <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 1 0-7-7l-1 1" />
                                <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 1 0 7 7l1-1" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            </svg></a>
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
