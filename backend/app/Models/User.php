<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'users';
    protected $primaryKey = 'uid';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'password',
        'photo_url',
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
        'remember_token',
    ];
}
