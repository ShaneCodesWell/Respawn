<?php

namespace App\Filament\Resources\Subscribers\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class SubscriberForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->disabled()
                    ->dehydrated(false),

                DateTimePicker::make('subscribed_at')
                    ->disabled()
                    ->dehydrated(false),

                Toggle::make('is_active')
                    ->helperText('Turn off to treat this subscriber as unsubscribed')
                    ->default(true),
            ]);
    }
}
