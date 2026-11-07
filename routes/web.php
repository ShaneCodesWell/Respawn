<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\ShortController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\WorkWithMeController;
use Illuminate\Support\Facades\Route;

// Homepage/Dashboard
Route::get('/', [HomeController::class, 'index'])->name('home.index');

// Videos Page
Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');

// Shorts Page
Route::get('/shorts', [ShortController::class, 'index'])->name('shorts.index');

// Blog Page
// Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
// Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

// Shop Page
// Route::get('/shop', [ShopController::class, 'index'])->name('shop.index');
// Route::get('/shop/{slug}', [ShopController::class, 'show'])->name('shop.show');

// Work With Me Page
Route::get('/work-with-me', [WorkWithMeController::class, 'index'])->name('work-with-me.index');

// Blogs
Route::get('/blog', [PostController::class, 'index'])->name('blog.index');
Route::get('/blog/{post:slug}', [PostController::class, 'show'])->name('blog.show');

Route::get('/shop', [ProductController::class, 'index'])->name('shop.index');
Route::get('/shop/{product:slug}', [ProductController::class, 'show'])->name('shop.show');

Route::post('/inquiries', [InquiryController::class, 'store'])->middleware('throttle:5,1')->name('inquiries.store');
Route::post('/subscribers', [SubscriberController::class, 'store'])->middleware('throttle:5,1')->name('subscribers.store');