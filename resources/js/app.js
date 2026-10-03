import './data.js';
import './shared.js';

const page = document.body.dataset.page;

switch (page) {
    case 'home':
        import('./pages/home.js');
        import('./pages/videos.js');   // video grid (the file starting with import { VIDEOS... })
        import('./pages/shorts.js');   // shorts rail (the coverflow one)
        import('./pages/blog.js');     // home blog grid
        import('./pages/shop.js');     // home store grid
        break;

    case 'videos':
        import('./pages/videos.js');
        break;

    case 'shorts':
        import('./pages/shorts-archive.js');
        break;

    case 'blog-archive':
        import('./pages/blog-archive.js');
        break;

    case 'shop-archive':
        import('./pages/shop-archive.js');
        break;

    case 'shop-product':
        import('./pages/shop-product.js');
        break;
}