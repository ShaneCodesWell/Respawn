<?php

namespace App\Models;

use App\Enums\PostStatus;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Post extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'excerpt',
        'body',
        'read_time',
        'is_featured',
        'status',
        'published_at',
    ];

    protected $casts = [
        'status' => PostStatus::class,
        'is_featured' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function scopePublished($query)
    {
        return $query->where('status', PostStatus::Published)
            ->where('published_at', '<=', now());
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('featured_image')->singleFile();
    }

    protected static function booted(): void
    {
        static::saving(function (Post $post) {
            // Auto-calculate read time if left blank
            if (empty($post->read_time)) {
                $words = str_word_count(strip_tags($post->body));
                $minutes = max(1, (int) ceil($words / 200));
                $post->read_time = "{$minutes} min read";
            }

            // Enforce only one featured post at a time
            if ($post->is_featured) {
                static::where('id', '!=', $post->id)
                    ->where('is_featured', true)
                    ->update(['is_featured' => false]);
            }
        });
    }
}
