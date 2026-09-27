<?php

namespace App\Models;

use App\Enums\ProductStatus;
use App\Enums\ProductType;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'name',
        'slug',
        'subtitle',
        'price',
        'type',
        'status',
        'badge',
        'description',
        'stock',
    ];

    protected $casts = [
        'type' => ProductType::class,
        'status' => ProductStatus::class,
        'price' => 'decimal:2',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('image')->singleFile();
    }
}
