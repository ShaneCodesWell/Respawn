<?php

namespace App\Filament\Resources\Products\Schemas;

use App\Enums\ProductStatus;
use App\Enums\ProductType;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn(Set $set, ?string $state) =>
                    $set('slug', Str::slug($state))),

                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),

                TextInput::make('subtitle'),

                SpatieMediaLibraryFileUpload::make('image')
                    ->collection('image')
                    ->image(),

                TextInput::make('price')
                    ->numeric()
                    ->prefix('$'),

                Select::make('type')
                    ->options(ProductType::class)
                    ->default(ProductType::Physical)
                    ->live()
                    ->required(),

                Select::make('status')
                    ->options(ProductStatus::class)
                    ->default(ProductStatus::Draft)
                    ->required(),

                TextInput::make('badge')
                    ->placeholder('New, Hot… leave blank for none'),

                Textarea::make('description')
                    ->columnSpanFull(),

                TextInput::make('stock')
                    ->numeric()
                    ->visible(fn(Get $get) => $get('type') === ProductType::Physical->value),
            ]);
    }
}
