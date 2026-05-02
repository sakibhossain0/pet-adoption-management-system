<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('success_stories', function (Blueprint $table) {
            $table->id('story_id');
            $table->string('title', 150);
            $table->text('story_text');
            $table->string('photo_url')->nullable();
            $table->date('date')->nullable();
            $table->unsignedBigInteger('adoption_id')->unique();
            $table->foreign('adoption_id')->references('adoption_id')->on('adoptions')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('success_stories');
    }
};
