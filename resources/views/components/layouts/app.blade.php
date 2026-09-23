<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0B0E14" />
    <title>Respawn Forever | Shane Forever Gaming</title>
    <meta name="description"
        content="Gameplay videos, shorts, blogs and custom work from Respawn Forever. Watch on YouTube." />
    <!-- Set theme before paint to avoid flash -->
    <script>
        (function() {
            try {
                var saved = localStorage.getItem("rf-theme");
                var theme =
                    saved ||
                    (window.matchMedia("(prefers-color-scheme: dark)").matches ?
                        "dark" :
                        "light");
                document.documentElement.setAttribute("data-theme", theme);
            } catch (e) {
                document.documentElement.setAttribute("data-theme", "light");
            }
        })();
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet" />
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body>
    <div class="scanlines"></div>

    <!-- ================= NAV ================= -->
    <x-nav-bar />

    <main>
        {{ $slot }}
    </main>

    <!-- ================= FOOTER ================= -->
    <x-footer />

    <!-- ================= MODAL ================= -->
    <div class="modal" id="modal" role="dialog" aria-modal="true" aria-label="Video player">
        <div class="modal__backdrop" data-close></div>
        <div class="modal__box">
            <button class="modal__close" data-close aria-label="Close video">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                </svg>
            </button>
            <div class="modal__player" id="modalPlayer"></div>
        </div>
    </div>

    <!-- ================= TOAST ================= -->
    <div class="toast" id="toast" role="status" aria-live="polite"></div>
</body>

</html>
