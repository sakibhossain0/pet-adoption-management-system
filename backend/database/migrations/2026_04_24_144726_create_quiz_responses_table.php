<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quiz_responses', function (Blueprint $table) {
            $table->id('rid');
            $table->string('answer', 500);
            $table->unsignedBigInteger('uid');
            $table->unsignedBigInteger('qid');
            $table->foreign('uid')->references('uid')->on('users')->cascadeOnDelete();
            $table->foreign('qid')->references('qid')->on('quiz_questions')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quiz_responses');
    }
};
