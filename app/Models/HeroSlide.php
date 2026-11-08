<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;

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

    protected function titleHtml(): Attribute
    {
        return Attribute::get(function () {
            $title = e($this->title);
            $highlight = e($this->title_highlight ?? '');

            if ($highlight === '' || ! str_contains($title, $highlight)) {
                return $title;
            }

            return Str::replaceFirst($highlight, '<em>' . $highlight . '</em>', $title);
        });
    }
}
