<?php

namespace App\Filament\Resources\HeroSlides\Tables;

use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;

class HeroSlidesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                SpatieMediaLibraryImageColumn::make('image')
                    ->collection('image'),
                Tables\Columns\TextColumn::make('title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order');
    }
}