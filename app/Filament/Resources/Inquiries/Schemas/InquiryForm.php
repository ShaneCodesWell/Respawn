<?php

namespace App\Filament\Resources\Inquiries\Schemas;

use App\Enums\InquiryStatus;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class InquiryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->disabled()
                    ->dehydrated(false),

                TextInput::make('email')
                    ->label('Email address')
                    ->disabled()
                    ->dehydrated(false),

                TextInput::make('request_type')
                    ->disabled()
                    ->dehydrated(false),

                TextInput::make('budget')
                    ->disabled()
                    ->dehydrated(false),

                Textarea::make('message')
                    ->disabled()
                    ->dehydrated(false)
                    ->columnSpanFull(),

                Select::make('status')
                    ->options(InquiryStatus::class)
                    ->default(InquiryStatus::New)
                    ->required(),

                Textarea::make('admin_notes')
                    ->columnSpanFull(),
            ]);
    }
}