/* =========================================================
   DATA — all content lives here
   Edit these arrays when you publish new content.
   ========================================================= */

/* Your YouTube channel */
const CHANNEL_URL = "https://www.youtube.com/@shaneforevergaming";

/* Replace `id` with real YouTube video IDs.
   Thumbnails are pulled automatically from YouTube. */

const VIDEOS = [
    {
        id: "X_gzkwuoG5M",
        title: "Spider-Man 2022",
        cat: "Blind Retrospective",
        tag: "Blind Retrospective",
        duration: "15:46",
        views: "312K",
        date: "2 days ago",
    },
    {
        id: "cxIKn_0MpzI",
        title: "Devil May Cry 5",
        cat: "Blind Retrospective",
        tag: "Blind Retrospective",
        duration: "36:38",
        views: "198K",
        date: "1 week ago",
    },
    {
        id: "vzmREjAQIR4",
        title: "Spider-Man: Miles Morales",
        cat: "Blind Retrospective",
        tag: "Blind Retrospective",
        duration: "15:34",
        views: "540K",
        date: "1 week ago",
    },
    {
        id: "CoXxgkX8T_4",
        title: "Call of Duty: Modern Warfare 2019",
        cat: "Blind Retrospective",
        tag: "Blind Retrospective",
        duration: "17:25",
        views: "87K",
        date: "2 weeks ago",
    },
    {
        id: "69oRIvhSGoU",
        title: "The Last of Us Part - Remastered",
        cat: "letsplay",
        tag: "Let's Play",
        duration: "1:02:11",
        views: "421K",
        date: "2 weeks ago",
    },
    {
        id: "V2VhKQsUOw8",
        title: "I Rebuilt the Entire City in 24 Hours",
        cat: "letsplay",
        tag: "Let's Play",
        duration: "15:29",
        views: "265K",
        date: "3 weeks ago",
    },
];

const SHORTS = [
    {
        id: "Rx-s2IH0VSs",
        title: "Spider-man suits",
        views: "1.2M",
    },
    {
        id: "oOofmZuRU5w",
        title: "POV: you're the last one alive",
        views: "890K",
    },
    { id: "gfKvnK53CaY", title: "That one teammate…", views: "2.4M" },
    {
        id: "p7jkunrjfr0",
        title: "Fastest speedrun trick ever",
        views: "670K",
    },
    { id: "kHW5AuiSEqk", title: "Bro forgot to save 💀", views: "1.8M" },
    { id: "vKAa44pl7Wo", title: "How to win every 1v1", views: "445K" },
];

const POSTS = [
    {
        feature: true,
        cat: "Patch Notes",
        date: "Mar 08, 2026",
        dateRaw: 20260308,
        title: "The Big Update Changed Everything — Here's What Actually Matters",
        excerpt: "The new season dropped and it rewrote half the meta. ...",
        read: "8 min read",
        url: "/blog/the-big-update",
        img: "/Images/idris-elba-as-7680x4320-13354.jpg",
    },
    {
        cat: "Opinion",
        date: "Jan 13, 2026",
        dateRaw: 20260113,
        title: "In Defense of Short Games",
        excerpt: "Not every game needs 100 hours of content. ...",
        read: "4 min read",
        url: "/blog/in-defense-of-short-games",
        img: "/Images/marvels-wolverine-3840x2160-24184.jpg",
    },
    {
        cat: "Behind the Scenes",
        date: "Mar 02, 2026",
        dateRaw: 20260302,
        title: "How I Edit a Full Video in Six Hours",
        excerpt: "My complete workflow, from raw capture to final export — plugins, presets and all.",
        read: "6 min read",
        url: "/blog/how-i-edit-a-full-video",
        img: "/Images/cyclops-season-8-5120x2880-26863.jpg",
    },
];

const PRODUCTS = [
    {
        name: "Respawn Forever Tee",
        sub: "Heavyweight cotton",
        price: "$28",
        priceRaw: 28,
        cat: "apparel",
        url: "/shop/respawn-forever-tee",
        badge: "New",
        glyph: "TEE",
        img: "https://picsum.photos/seed/respawn-shop-1/600/600",
    },
    {
        name: "Night Ops Hoodie",
        sub: "Drop 004",
        price: "$58",
        priceRaw: 58,
        cat: "apparel",
        url: "/shop/night-ops-hoodie",
        badge: "",
        glyph: "HD",
        img: "https://picsum.photos/seed/respawn-shop-2/600/600",
    },
    {
        name: "Sticker Pack Vol. 1",
        sub: "12 vinyl stickers",
        price: "$12",
        priceRaw: 12,
        cat: "accessories",
        url: "/shop/sticker-pack-vol-1",
        badge: "",
        glyph: "STK",
        img: "https://picsum.photos/seed/respawn-shop-3/600/600",
    },
    {
        name: "Thumbnail Preset Pack",
        sub: "Digital download",
        price: "$19",
        priceRaw: 19,
        cat: "digital",
        url: "/shop/thumbnail-preset-pack",
        badge: "Hot",
        glyph: "PSD",
        img: "https://picsum.photos/seed/respawn-shop-4/600/600",
    },
];

/* ---------- HELPERS ---------- */
const ytThumb = id => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
const ytThumbQ = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const fallback = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

function withFallback(img, seed, w, h) {
    img.addEventListener("error", function handler() {
        img.removeEventListener("error", handler);
        img.src = fallback(seed, w, h);
    });
}

export {
    CHANNEL_URL,
    VIDEOS,
    SHORTS,
    POSTS,
    PRODUCTS,
    ytThumb,
    ytThumbQ,
    fallback,
    withFallback,
};