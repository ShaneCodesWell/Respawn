<?php

namespace App\Http\Controllers;

use Illuminate\View\View;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(): View
    {
        return view('blog.index');
    }

    public function show(string $slug): View
    {
        return view('blog.show', compact('slug'));
    }
}
