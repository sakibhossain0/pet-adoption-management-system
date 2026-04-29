<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Adoption extends Model
{
    protected $table = 'adoptions';
    protected $primaryKey = 'adoption_id';
    public $timestamps = false;

    protected $fillable = [
        'adoption_date',
        'app_id',
    ];
}
