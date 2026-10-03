<?php

namespace App\Http\Controllers;

use Illuminate\View\View;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(): View
    {
        return view('blogs.index');
    }

    public function show(string $slug): View
    {
        return view('blogs.show', compact('slug'));
    }
}
