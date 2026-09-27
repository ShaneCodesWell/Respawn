<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum VideoType: string implements HasLabel
{
    case Video = 'video';
    case Short = 'short';

    public function getLabel(): string
    {
        return match ($this) {
            self::Video => 'Video (main grid)',
            self::Short => 'Short',
        };
    }
}
