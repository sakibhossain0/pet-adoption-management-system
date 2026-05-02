<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shelters', function (Blueprint $table) {
            $table->id('shid');
            $table->string('shelter_name', 120);
            $table->string('contact_no', 20)->nullable();
            $table->string('address')->nullable();
            $table->unsignedInteger('capacity')->default(0);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shelters');
    }
};
