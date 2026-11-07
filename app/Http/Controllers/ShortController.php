<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\View\View;
use Illuminate\Http\Request;

class ShortController extends Controller
{
    public function index(): View
    {
        return view('shorts.index', [
            'shorts' => Video::shorts()
                ->where('is_active', true)
                ->latest('published_at')
                ->get(),
        ]);
    }
}
