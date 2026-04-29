<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
      protected $table = 'donations';
    protected $primaryKey = 'did';
    public $timestamps = false;

    protected $fillable = [
        'status',
        'date',
        'amount',
        'uid',
        'shid',
    ];
}
