<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('foster_parents', function (Blueprint $table) {
            $table->id('fid');
            $table->string('name', 100);
            $table->string('phone', 20)->nullable();
            $table->string('address')->nullable();
            $table->unsignedInteger('housing_capacity')->nullable();
            $table->unsignedInteger('experience')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('foster_parents');
    }
};
