<?php

namespace App\Http\Controllers;

use Illuminate\View\View;
use Illuminate\Http\Request;

class ShortController extends Controller
{
    public function index(): View
    {
        return view('shorts.index');
    }
}
