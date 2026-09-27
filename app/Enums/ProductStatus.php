<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum ProductStatus: string implements HasLabel
{
    case Draft = 'draft';
    case ComingSoon = 'coming_soon';
    case Active = 'active';

    public function getLabel(): string
    {
        return match ($this) {
            self::Draft => 'Draft',
            self::ComingSoon => 'Coming Soon',
            self::Active => 'Active',
        };
    }
}
