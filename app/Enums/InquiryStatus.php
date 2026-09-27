<?php

namespace App\Enums;

enum InquiryStatus: string
{
    case New = 'new';
    case Reviewed = 'reviewed';
    case Contacted = 'contacted';
    case Archived = 'archived';
}
