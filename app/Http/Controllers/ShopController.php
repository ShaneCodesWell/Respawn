<?php

namespace App\Http\Controllers;

use Illuminate\View\View;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function index(): View
    {
        return view('shop.index');
    }

    public function show(string $slug): View
    {
        return view('shop.show', compact('slug'));
    }
}
