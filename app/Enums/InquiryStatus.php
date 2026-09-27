<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum InquiryStatus: string implements HasLabel
{
    case New = 'new';
    case Reviewed = 'reviewed';
    case Contacted = 'contacted';
    case Archived = 'archived';

    public function getLabel(): string
    {
        return match ($this) {
            self::New => 'New',
            self::Reviewed => 'Reviewed',
            self::Contacted => 'Contacted',
            self::Archived => 'Archived',
        };
    }
}
