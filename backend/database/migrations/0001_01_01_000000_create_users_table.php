<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('uid');
            $table->string('name', 100);
            $table->string('phone', 20)->nullable();
            $table->string('email', 150)->unique();
            $table->string('password');
            $table->string('photo_url')->nullable();
            $table->string('lifestyle_type', 50)->nullable();
            $table->string('housing_type', 50)->nullable();
            $table->string('skill_level', 50)->nullable();
            $table->string('availability', 100)->nullable();
            $table->string('access_code', 50)->nullable();
            $table->string('admin_level', 50)->nullable();
            $table->enum('user_type', ['ADOPTER', 'VOLUNTEER', 'ADMIN'])->default('ADOPTER');
            $table->rememberToken();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
    }
};
