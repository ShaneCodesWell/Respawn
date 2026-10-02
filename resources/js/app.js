import './data.js';
import './shared.js';

const page = document.body.dataset.page;

switch (page) {
    case 'home':
        import('./pages/home');
        break;

    case 'videos':
        import('./pages/videos');
        break;

    case 'shorts':
        import('./pages/shorts');
        break;

    case 'blog':
        import('./pages/blog');
        break;

    case 'shop':
        import('./pages/shop');
        break;
}