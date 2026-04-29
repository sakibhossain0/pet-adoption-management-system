<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizResponse extends Model
{
    protected $table = 'quiz_responses';
    protected $primaryKey = 'rid';
    public $timestamps = false;

    protected $fillable = [
        'answer',
        'uid',
        'qid',
    ];
}
