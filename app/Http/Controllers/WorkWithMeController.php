<?php

namespace App\Http\Controllers;

use Illuminate\View\View;
use Illuminate\Http\Request;

class WorkWithMeController extends Controller
{
    public function index(): View
    {
        return view('work-with-me.index');
    }
}
