<?php

namespace App\Models;

use App\Enums\InquiryStatus;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    protected $fillable = [
        'name',
        'email',
        'request_type',
        'budget',
        'message',
        'status',
        'admin_notes',
    ];

    protected $casts = [
        'status' => InquiryStatus::class,
    ];
}
