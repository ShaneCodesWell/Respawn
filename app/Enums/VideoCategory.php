<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum VideoCategory: string implements HasLabel
{
    case LetsPlay = 'letsplay';
    case Review = 'review';
    case Highlight = 'highlight';
    case Guide = 'guide';
    case BlindRetrospective = 'blind_retrospective';

    public function getLabel(): string
    {
        return match ($this) {
            self::LetsPlay => "Let's Play",
            self::Review => 'Reviews',
            self::Highlight => 'Highlights',
            self::Guide => 'Guides',
            self::BlindRetrospective => 'Blind Retrospective',
        };
    }
}
