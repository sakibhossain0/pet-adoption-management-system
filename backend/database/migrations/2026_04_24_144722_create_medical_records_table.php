<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medical_records', function (Blueprint $table) {
            $table->id('mid');
            $table->string('treatment');
            $table->decimal('cost', 10, 2)->default(0);
            $table->date('date');
            $table->text('note')->nullable();
            $table->unsignedBigInteger('pet_id');
            $table->foreign('pet_id')->references('pet_id')->on('pets')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medical_records');
    }
};
