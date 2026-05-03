<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $table = 'applications';
    protected $primaryKey = 'app_id';
    public $timestamps = false;

    protected $fillable = [
        'status',
        'submission_date',
        'uid',
        'pet_id',
        'applicant_name',
        'phone',
        'email',
        'housing_type',
        'other_pets',
        'daily_availability',
    ];
}
