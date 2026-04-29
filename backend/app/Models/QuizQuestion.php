<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    protected $table = 'quiz_questions';
    protected $primaryKey = 'qid';
    public $timestamps = false;

    protected $fillable = [
        'question_text',
        'uid',
    ];
}
