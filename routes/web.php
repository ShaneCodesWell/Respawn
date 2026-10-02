<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', [HomeController::class, 'index'])->name('home.index');
Route::get('/videos', [HomeController::class, 'videos'])->name('videos.index');
Route::get('/shorts', [HomeController::class, 'shorts'])->name('shorts.index');
Route::get('/blog', [HomeController::class, 'blog'])->name('blog.index');
Route::get('/shop', [HomeController::class, 'shop'])->name('shop.index');
Route::get('/work-with-me', [HomeController::class, 'workWithMe'])->name('work-with-me.index');