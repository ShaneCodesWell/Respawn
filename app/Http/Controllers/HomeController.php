<?php

namespace App\Http\Controllers;

use Illuminate\View\View;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(): View
    {
        // Fetch videos and shorts from the database or any other source
        // $videos = Video::where('is_short', false)
        //     ->latest('published_at')
        //     ->take(3)
        //     ->get();

        // $shorts = Video::where('is_short', true)
        //     ->latest('published_at')
        //     ->take(10)
        //     ->get();

        return view('home.index', 
        //compact('videos', 'shorts')
        );
    }
}
