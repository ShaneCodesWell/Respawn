<?php

namespace App\Models;

use App\Enums\VideoCategory;
use App\Enums\VideoType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

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

    protected function viewsRaw(): Attribute
    {
        return Attribute::get(function () {
            $v = strtoupper(trim((string) $this->views));
            if ($v === '') {
                return 0;
            }
            $n = (float) preg_replace('/[^0-9.]/', '', $v);

            return (int) match (true) {
                str_ends_with($v, 'M') => $n * 1_000_000,
                str_ends_with($v, 'K') => $n * 1_000,
                default => $n,
            };
        });
    }
}
