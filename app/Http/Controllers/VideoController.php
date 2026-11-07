<?php

namespace App\Http\Controllers;

use App\Enums\VideoCategory;
use App\Models\Video;
use Illuminate\View\View;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function index(): View
    {
        return view('videos.index', [
            'videos' => Video::videos()
                ->where('is_active', true)
                ->latest('published_at')
                ->get(),
            'videoCategories' => VideoCategory::cases(),
        ]);
    }
}
