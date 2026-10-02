<?php

namespace App\Http\Controllers;

use App\Enums\VideoCategory;
use App\Enums\VideoType;
use App\Models\HeroSlide;
use App\Models\Post;
use App\Models\Product;
use App\Models\Video;
use Illuminate\View\View;
use Illuminate\Http\Request;
class HomeController extends Controller
{
    public function index(): View
    {
        return view('home.index', [
            'slides' => HeroSlide::where('is_active', true)
                ->orderBy('sort_order')
                ->get(),

            'videos' => Video::where('type', VideoType::Video)
                ->where('is_active', true)
                ->latest('published_at')
                ->get(),

            'shorts' => Video::where('type', VideoType::Short)
                ->where('is_active', true)
                ->latest('published_at')
                ->get(),

            'videoCategories' => VideoCategory::cases(),

            'posts' => Post::published()
                ->orderByDesc('is_featured')
                ->latest('published_at')
                ->take(6)
                ->get(),

            'products' => Product::whereIn('status', ['active', 'coming_soon'])
                ->get(),
        ]);
    }
}
