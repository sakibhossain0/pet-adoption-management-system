<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id('app_id');
            $table->string('status', 30)->default('Pending');
            $table->date('submission_date');
            $table->unsignedBigInteger('uid');
            $table->unsignedBigInteger('pet_id');
            $table->string('applicant_name', 100)->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('email', 150)->nullable();
            $table->string('housing_type', 80)->nullable();
            $table->string('other_pets', 80)->nullable();
            $table->string('daily_availability', 100)->nullable();
            $table->foreign('uid')->references('uid')->on('users')->cascadeOnDelete();
            $table->foreign('pet_id')->references('pet_id')->on('pets')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
