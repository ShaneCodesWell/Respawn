<?php

namespace App\Filament\Resources\Videos\Schemas;

use App\Enums\VideoCategory;
use App\Enums\VideoType;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;

class VideoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('youtube_id')
                    ->label('YouTube video ID')
                    ->helperText('The part after ?v= or youtu.be/ in the URL')
                    ->required(),

                TextInput::make('title')
                    ->required(),

                Select::make('type')
                    ->options(VideoType::class)
                    ->default(VideoType::Video)
                    ->live()
                    ->required(),

                Select::make('category')
                    ->options(VideoCategory::class)
                    ->visible(fn(Get $get) => $get('type') === VideoType::Video->value)
                    ->required(fn(Get $get) => $get('type') === VideoType::Video->value),

                TextInput::make('tag_label')
                    ->helperText('Display label shown on the card, e.g. "Blind Retrospective"'),

                TextInput::make('duration')
                    ->placeholder('15:46'),

                TextInput::make('views')
                    ->placeholder('312K'),

                DateTimePicker::make('published_at')
                    ->default(now()),

                Toggle::make('is_active')
                    ->default(true)
                    ->required(),
            ]);
    }
}
