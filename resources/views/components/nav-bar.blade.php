<header class="nav" id="nav">
    <div class="nav__inner">
        <a href="{{ route('home.index') }}" class="brand" aria-label="Respawn Forever — home">
            <span class="brand__mark">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.5 12a8.5 8.5 0 1 1-2.6-6.1" />
                    <path d="M20.8 4.2v5.2h-5.2" />
                </svg>
            </span>
            <span class="brand__text">
                <span class="brand__name">Respawn Forever</span>
                <span class="brand__sub">Play · Watch · Repeat</span>
            </span>
        </a>

        <nav>
            <ul class="nav__menu" id="navMenu">
                <li><a class="nav__link" href="{{ route('home.index') }}">Home</a></li>
                <li><a class="nav__link" href="{{ route('videos.index') }}">Videos</a></li>
                <li><a class="nav__link" href="{{ route('shorts.index') }}">Shorts</a></li>
                <li><a class="nav__link" href="{{ route('blog.index') }}">Journal</a></li>
                <li><a class="nav__link" href="{{ route('shop.index') }}">Shop</a></li>
                <li><a class="nav__link" href="{{ route('work-with-me.index') }}">Work With Me</a></li>
                <li class="nav__cta">
                    <a class="btn btn--primary btn--sm" href="#" data-yt>Subscribe</a>
                </li>
            </ul>
        </nav>

        <div class="nav__actions">
            <button class="theme-toggle" id="themeToggle" type="button" aria-label="Switch to dark mode"
                aria-pressed="false">
                <svg class="theme-toggle__sun" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path
                        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
                <svg class="theme-toggle__moon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                </svg>
            </button>

            <button class="nav__toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
                <span></span>
            </button>
        </div>
    </div>
</header>
