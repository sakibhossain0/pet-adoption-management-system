<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FosterParent extends Model
{
    protected $table = 'foster_parents';
    protected $primaryKey = 'fid';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'phone',
        'address',
        'housing_capacity',
        'experience',
    ];
}