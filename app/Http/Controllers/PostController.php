<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\View\View;

class PostController extends Controller
{
    public function index(): View
    {
        $posts = Post::published()->latest('published_at')->get();
        $categories = $posts->pluck('category')->filter()->unique()->sort()->values();

        return view('blog.index', compact('posts', 'categories'));
    }

    public function show(Post $post): View
    {
        // Drafts and scheduled posts 404 even if someone guesses the slug
        abort_unless(Post::published()->whereKey($post->id)->exists(), 404);

        return view('blog.show', [
            'post' => $post,
            'related' => Post::published()
                ->whereKeyNot($post->id)
                ->latest('published_at')
                ->take(3)
                ->get(),
        ]);
    }
}
