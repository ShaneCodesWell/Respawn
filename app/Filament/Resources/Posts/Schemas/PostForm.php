<?php

namespace App\Filament\Resources\Posts\Schemas;

use App\Enums\PostStatus;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Utilities\Set;
use Illuminate\Support\Str;

class PostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn(Set $set, ?string $state) =>
                    $set('slug', Str::slug($state))),

                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),

                TextInput::make('category')
                    ->placeholder('Patch Notes, Opinion, Behind the Scenes…'),

                SpatieMediaLibraryFileUpload::make('featured_image')
                    ->collection('featured_image')
                    ->image()
                    ->required(),

                Textarea::make('excerpt')
                    ->maxLength(500)
                    ->rows(3),

                RichEditor::make('body')
                    ->required()
                    ->columnSpanFull(),

                TextInput::make('read_time')
                    ->placeholder('Leave blank to auto-calculate')
                    ->helperText('e.g. "8 min read" — auto-filled from word count if left empty'),

                Toggle::make('is_featured')
                    ->helperText('Only one post should be featured at a time — displays as the large card')
                    ->default(false),

                Select::make('status')
                    ->options(PostStatus::class)
                    ->default(PostStatus::Draft)
                    ->required(),

                DateTimePicker::make('published_at')
                    ->default(now()),
            ]);
    }
}
