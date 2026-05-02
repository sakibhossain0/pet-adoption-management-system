<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pets', function (Blueprint $table) {
            $table->id('pet_id');
            $table->string('name', 100);
            $table->unsignedInteger('age')->nullable();
            $table->string('gender', 20)->nullable();
            $table->string('breed', 80)->nullable();
            $table->string('temperament', 120)->nullable();
            $table->string('adopt_status', 30)->default('Available');
            $table->string('species', 50);
            $table->text('description')->nullable();
            $table->string('photo_url')->nullable();
            $table->unsignedBigInteger('shid')->nullable();
            $table->unsignedBigInteger('fid')->nullable();
            $table->foreign('shid')->references('shid')->on('shelters')->nullOnDelete();
            $table->foreign('fid')->references('fid')->on('foster_parents')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
