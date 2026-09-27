<?php

namespace App\Filament\Resources\HeroSlides\Schemas;

use Filament\Infolists\Components\SpatieMediaLibraryImageEntry;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class HeroSlideInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            SpatieMediaLibraryImageEntry::make('image')
                ->collection('image'),
            TextEntry::make('eyebrow'),
            TextEntry::make('title'),
            TextEntry::make('title_highlight'),
            TextEntry::make('subtitle'),
            TextEntry::make('cta_primary_label'),
            TextEntry::make('cta_primary_url'),
            TextEntry::make('cta_secondary_label'),
            TextEntry::make('cta_secondary_url'),
            TextEntry::make('sort_order'),
            IconEntry::make('is_active')->boolean(),
        ]);
    }
}