<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $table = 'users';
    protected $primaryKey = 'uid';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'password',
        'lifestyle_type',
        'housing_type',
        'skill_level',
        'availability',
        'access_code',
        'admin_level',
        'user_type',
    ];

    protected $hidden = [
        'password',
    ];
}