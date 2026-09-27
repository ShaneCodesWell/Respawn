<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class HeroSlide extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'eyebrow',
        'title',
        'title_highlight',
        'subtitle',
        'cta_primary_label',
        'cta_primary_url',
        'cta_secondary_label',
        'cta_secondary_url',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('image')->singleFile();
    }
}
