<?php

namespace App\Models;

use App\Enums\VideoCategory;
use App\Enums\VideoType;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $fillable = [
        'youtube_id',
        'title',
        'type',
        'category',
        'tag_label',
        'duration',
        'views',
        'published_at',
        'is_active',
    ];

    protected $casts = [
        'type' => VideoType::class,
        'category' => VideoCategory::class,
        'published_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function scopeVideos($query)
    {
        return $query->where('type', VideoType::Video);
    }

    public function scopeShorts($query)
    {
        return $query->where('type', VideoType::Short);
    }
}
