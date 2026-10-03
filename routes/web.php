<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\ShortController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\WorkWithMeController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

// Homepage/Dashboard
Route::get('/', [HomeController::class, 'index'])->name('home.index');

// Videos Page
Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');

// Shorts Page
Route::get('/shorts', [ShortController::class, 'index'])->name('shorts.index');

// Blog Page
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

// Shop Page
Route::get('/shop', [ShopController::class, 'index'])->name('shop.index');
Route::get('/shop/{slug}', [ShopController::class, 'show'])->name('shop.show');

// Work With Me Page
Route::get('/work-with-me', [WorkWithMeController::class, 'index'])->name('work-with-me.index');