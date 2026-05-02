<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    protected $table = 'pets';
    protected $primaryKey = 'pet_id';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'age',
        'gender',
        'breed',
        'temperament',
        'adopt_status',
        'species',
        'description',
        'photo_url',
        'shid',
        'fid',
    ];
}
