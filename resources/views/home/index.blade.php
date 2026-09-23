<x-layouts.app>
    <!-- ================= FULL-BLEED HERO ================= -->
    <section class="hero" id="home">
        <h1 class="sr-only">
            Respawn Forever — gaming videos, shorts and stories
        </h1>

        <div class="carousel" id="heroCarousel" aria-roledescription="carousel" aria-label="Featured">
            <div class="carousel__viewport">
                <div class="carousel__track" id="heroTrack">
                    <!-- SLIDE 1 -->
                    <article class="slide" data-slide>
                        <img src="Images/Jason_and_Lucia_03.jpg" alt="Jason and Lucia GTA VI" />
                        <div class="slide__scrim"></div>
                        <div class="slide__grid"></div>
                        <div class="slide__content">
                            <div class="slide__inner">
                                <p class="slide__eyebrow">
                                    <i></i> New video · every Friday
                                </p>
                                <h2 class="hero__title">
                                    Some worlds you never <em>really</em> leave.
                                </h2>
                                <p class="slide__sub">
                                    Long-form gameplay, honest reviews and the kind of
                                    sessions that run until the sun comes up. Pull up a chair.
                                </p>
                                <div class="slide__cta">
                                    <a class="btn btn--light" href="#videos">Watch the latest</a>
                                    <a class="btn btn--outline-light" href="#" data-yt>YouTube channel</a>
                                </div>
                            </div>
                        </div>
                    </article>

                    <!-- SLIDE 2 -->
                    <article class="slide" data-slide>
                        <img src="Images/Jason_and_Lucia_10.jpg" alt="Jason and Lucia GTA VI at a party" />
                        <div class="slide__scrim"></div>
                        <div class="slide__grid"></div>
                        <div class="slide__content">
                            <div class="slide__inner">
                                <p class="slide__eyebrow"><i></i> Shorts · daily drops</p>
                                <h2 class="hero__title">
                                    Sixty seconds of <em>pure</em> chaos.
                                </h2>
                                <p class="slide__sub">
                                    Quick clips, funny moments and clutch plays. New shorts
                                    land every single day — perfect with a coffee.
                                </p>
                                <div class="slide__cta">
                                    <a class="btn btn--light" href="#shorts">Browse shorts</a>
                                    <a class="btn btn--outline-light" href="#hire">Request a clip</a>
                                </div>
                            </div>
                        </div>
                    </article>

                    <!-- SLIDE 3 -->
                    <article class="slide" data-slide>
                        <img src="Images/Vice_City_09.jpg" alt="Vice City streets during the day" />
                        <div class="slide__scrim"></div>
                        <div class="slide__grid"></div>
                        <div class="slide__content">
                            <div class="slide__inner">
                                <p class="slide__eyebrow"><i></i> Commissions · open now</p>
                                <h2 class="hero__title">
                                    Let's build something <em>worth</em> watching.
                                </h2>
                                <p class="slide__sub">
                                    Editing, thumbnails, sponsorships or a custom gameplay
                                    request — send the brief and I'll reply within 48 hours.
                                </p>
                                <div class="slide__cta">
                                    <a class="btn btn--light" href="#hire">Start a request</a>
                                    <a class="btn btn--outline-light" href="#store">Visit the shop</a>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>

            <a class="hero__badge" href="#" data-yt>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z" />
                </svg>
                <span>@respawnforever <b>· Live</b></span>
            </a>

            <button class="carousel__arrow carousel__arrow--prev" id="prevBtn" aria-label="Previous slide">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15 5l-7 7 7 7" />
                </svg>
            </button>
            <button class="carousel__arrow carousel__arrow--next" id="nextBtn" aria-label="Next slide">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <div class="carousel__dots" id="heroDots" role="tablist" aria-label="Choose slide"></div>
            <div class="carousel__progress"><i id="heroProgress"></i></div>
        </div>
    </section>

    <!-- ================= TICKER ================= -->
    <div class="ticker" aria-hidden="true">
        <div class="ticker__track">
            <div class="ticker__group">
                <span class="ticker__item"><i class="ticker__dot"></i>New video <b>every Friday</b></span>
                <span class="ticker__item"><i class="ticker__dot"></i>Shorts <b>daily</b></span>
                <span class="ticker__item"><i class="ticker__dot"></i>Commissions <b>open</b></span>
                <span class="ticker__item"><i class="ticker__dot"></i>Merch <b>drop 004 live</b></span>
                <span class="ticker__item"><i class="ticker__dot"></i>Business
                    <b>inquiries welcome</b></span>
            </div>
            <div class="ticker__group">
                <span class="ticker__item"><i class="ticker__dot"></i>New video <b>every Friday</b></span>
                <span class="ticker__item"><i class="ticker__dot"></i>Shorts <b>daily</b></span>
                <span class="ticker__item"><i class="ticker__dot"></i>Commissions <b>open</b></span>
                <span class="ticker__item"><i class="ticker__dot"></i>Merch <b>drop 004 live</b></span>
                <span class="ticker__item"><i class="ticker__dot"></i>Business
                    <b>inquiries welcome</b></span>
            </div>
        </div>
    </div>

    <!-- ================= VIDEOS ================= -->
    <section class="section" id="videos">
        <div class="container">
            <div class="sec-head reveal">
                <div>
                    <p class="eyebrow">Latest uploads</p>
                    <h2 class="sec-title">Fresh from the <em>channel</em></h2>
                    <p class="sec-desc">
                        Long-form gameplay, reviews and deep dives. Tap any card to
                        watch it right here.
                    </p>
                </div>
                <a class="link-arrow" href="#" data-yt>
                    All videos on YouTube
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                </a>
            </div>

            <div class="filters reveal" id="videoFilters">
                <button class="chip active" data-filter="all">All</button>
                <button class="chip" data-filter="letsplay">Let's Play</button>
                <button class="chip" data-filter="review">Reviews</button>
                <button class="chip" data-filter="highlight">Highlights</button>
                <button class="chip" data-filter="guide">Guides</button>
            </div>

            <div class="vgrid" id="videoGrid"><!-- injected --></div>
        </div>
    </section>

    <!-- ================= SHORTS ================= -->
    <section class="section section--soft" id="shorts">
        <div class="container">
            <div class="sec-head reveal">
                <div>
                    <p class="eyebrow">Quick hits</p>
                    <h2 class="sec-title">Shorts &amp; <em>clips</em></h2>
                    <p class="sec-desc">
                        A minute or less. Slide through with the arrows, or swipe on
                        mobile. Tap any card to play.
                    </p>
                </div>
                <a class="link-arrow" href="#" data-yt>
                    More shorts
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                </a>
            </div>

            <div class="shorts-stage reveal" id="shortsStage">
                <div class="rail" id="shortsRail" tabindex="0"
                    aria-label="Shorts rail — use arrow keys to browse"></div>

                <button class="rail-nav rail-nav--prev" id="shortsPrev" type="button" aria-label="Previous shorts">
                    <svg viewBox="0 0 24 24">
                        <path d="M15 5l-7 7 7 7" />
                    </svg>
                </button>
                <button class="rail-nav rail-nav--next" id="shortsNext" type="button" aria-label="Next shorts">
                    <svg viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    </section>

    <!-- ================= BLOG ================= -->
    <section class="section" id="blog">
        <div class="container">
            <div class="sec-head reveal">
                <div>
                    <p class="eyebrow">The journal</p>
                    <h2 class="sec-title">
                        Notes, thoughts &amp; <em>patch talk</em>
                    </h2>
                    <p class="sec-desc">
                        The stories behind the videos — and the opinions nobody asked
                        for.
                    </p>
                </div>
                <a class="link-arrow" href="#">
                    All articles
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                </a>
            </div>

            <div class="bgrid" id="blogGrid"><!-- injected --></div>
        </div>
    </section>

    <!-- ================= STORE ================= -->
    <section class="section section--soft" id="store">
        <div class="container">
            <div class="sec-head reveal">
                <div>
                    <p class="eyebrow">The shop</p>
                    <h2 class="sec-title">Merch &amp; <em>digital goods</em></h2>
                    <p class="sec-desc">
                        Things I actually use, wear, and ship out myself.
                    </p>
                </div>
                <a class="link-arrow" href="#">
                    Browse everything
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                </a>
            </div>

            <div class="sgrid" id="storeGrid"><!-- injected --></div>
        </div>
    </section>

    <!-- ================= HIRE ================= -->
    <section class="section section--warm" id="hire">
        <div class="container">
            <div class="sec-head reveal">
                <div>
                    <p class="eyebrow">Work with me</p>
                    <h2 class="sec-title">Special <em>requests</em></h2>
                    <p class="sec-desc">
                        Editing, thumbnails, sponsorships or a custom gameplay request —
                        send the brief and I'll get back to you within 48 hours.
                    </p>
                </div>
            </div>

            <div class="hire">
                <div class="reveal">
                    <div class="svc">
                        <span class="svc__num">01</span>
                        <div>
                            <h3 class="svc__title">Video editing &amp; thumbnails</h3>
                            <p class="svc__desc">
                                Full edit, sound design, colour grade and a scroll-stopping
                                thumbnail. Delivered in 5–7 days.
                            </p>
                        </div>
                    </div>
                    <div class="svc">
                        <span class="svc__num">02</span>
                        <div>
                            <h3 class="svc__title">Sponsorships &amp; brand deals</h3>
                            <p class="svc__desc">
                                Integrated segments, dedicated videos or shorts packages.
                                Media kit available on request.
                            </p>
                        </div>
                    </div>
                    <div class="svc">
                        <span class="svc__num">03</span>
                        <div>
                            <h3 class="svc__title">Custom gameplay requests</h3>
                            <p class="svc__desc">
                                Want me to play a specific game, challenge or mod? Drop the
                                request and I'll add it to the queue.
                            </p>
                        </div>
                    </div>
                    <div class="svc">
                        <span class="svc__num">04</span>
                        <div>
                            <h3 class="svc__title">Co-op &amp; collabs</h3>
                            <p class="svc__desc">
                                Creator collabs, podcasts and community lobbies. Open to
                                most platforms and genres.
                            </p>
                        </div>
                    </div>
                </div>

                <form class="form reveal" id="requestForm" novalidate>
                    <h3 class="form__title">Send a request</h3>
                    <p class="form__note">All fields marked * are required.</p>

                    <div class="field-row">
                        <div class="field">
                            <label for="name">Name *</label>
                            <input id="name" name="name" type="text" placeholder="Your name" required />
                        </div>
                        <div class="field">
                            <label for="email">Email *</label>
                            <input id="email" name="email" type="email" placeholder="you@email.com"
                                required />
                        </div>
                    </div>

                    <div class="field">
                        <label for="type">Request type *</label>
                        <select id="type" name="type" required>
                            <option value="">Select one…</option>
                            <option>Video editing &amp; thumbnails</option>
                            <option>Sponsorship / brand deal</option>
                            <option>Custom gameplay request</option>
                            <option>Co-op / collab</option>
                            <option>Something else</option>
                        </select>
                    </div>

                    <div class="field">
                        <label for="budget">Budget (optional)</label>
                        <input id="budget" name="budget" type="text" placeholder="e.g. $500 – $1,500" />
                    </div>

                    <div class="field">
                        <label for="message">Details *</label>
                        <textarea id="message" name="message" placeholder="Tell me about the project…" required></textarea>
                    </div>

                    <button class="btn btn--primary" type="submit">
                        Submit request
                    </button>
                </form>
            </div>
        </div>
    </section>
</x-layouts.app>
