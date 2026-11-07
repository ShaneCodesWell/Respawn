import './shared.js';

const page = document.body.dataset.page;

switch (page) {
    case 'home':
        import('./pages/home.js');
        import('./pages/videos.js');
        import('./pages/shorts.js');
        break;

    case 'videos':
        import('./pages/videos.js');
        break;

    case 'shorts':
        import('./pages/shorts-archive.js');
        break;

    case 'blog':
        import('./pages/blog-archive.js');
        break;

    case 'shop':
        import('./pages/shop-archive.js');
        break;

    case 'shop-product':
        import('./pages/shop-product.js');
        break;
}