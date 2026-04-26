<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shelter extends Model
{
    protected $table = 'shelters';
    protected $primaryKey = 'shid';
    public $timestamps = false;

    protected $fillable = [
        'shelter_name',
        'contact_no',
        'address',
        'capacity',
    ];
}