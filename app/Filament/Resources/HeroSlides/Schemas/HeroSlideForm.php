<?php

namespace App\Filament\Resources\HeroSlides\Schemas;

use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Fieldset;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;

class HeroSlideForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            SpatieMediaLibraryFileUpload::make('image')
                ->collection('image')
                ->image()
                ->required(),

            Forms\Components\TextInput::make('eyebrow')
                ->maxLength(255),

            Forms\Components\TextInput::make('title')
                ->required()
                ->maxLength(255),

            Forms\Components\TextInput::make('title_highlight')
                ->helperText('The word/phrase rendered in the accent colour (the <em> part)')
                ->maxLength(255),

            Forms\Components\Textarea::make('subtitle')
                ->rows(3),

            Fieldset::make('Primary CTA')
                ->schema([
                    Forms\Components\TextInput::make('cta_primary_label'),
                    Forms\Components\TextInput::make('cta_primary_url'),
                ]),

            Fieldset::make('Secondary CTA')
                ->schema([
                    Forms\Components\TextInput::make('cta_secondary_label'),
                    Forms\Components\TextInput::make('cta_secondary_url'),
                ]),

            Forms\Components\TextInput::make('sort_order')
                ->numeric()
                ->default(0),

            Forms\Components\Toggle::make('is_active')
                ->default(true),
        ]);
    }
}
