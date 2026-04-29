<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SuccessStory extends Model
{
    protected $table = 'success_stories';
    protected $primaryKey = 'story_id';
    public $timestamps = false;

    protected $fillable = [
        'title',
        'story_text',
        'photo_url',
        'date',
        'adoption_id',
    ];
}
