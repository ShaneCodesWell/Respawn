<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum ProductType: string implements HasLabel
{
    case Physical = 'physical';
    case Digital = 'digital';
    case Service = 'service';

    public function getLabel(): string
    {
        return match ($this) {
            self::Physical => 'Physical',
            self::Digital => 'Digital',
            self::Service => 'Service',
        };
    }
}
