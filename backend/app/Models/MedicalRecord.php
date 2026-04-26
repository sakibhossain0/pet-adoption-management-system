<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicalRecord extends Model
{
    protected $table = 'medical_records';
    protected $primaryKey = 'mid';
    public $timestamps = false;

    protected $fillable = [
        'treatment',
        'cost',
        'date',
        'pet_id',
    ];
}