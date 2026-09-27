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
}
