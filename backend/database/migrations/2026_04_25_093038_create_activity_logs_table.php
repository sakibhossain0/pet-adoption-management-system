<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Kept as a no-op because activity_logs is created in 2026_04_24_144723_create_activity_logs_table.php.
        // This prevents duplicate table errors when running fresh migrations.
        if (!Schema::hasTable('activity_logs')) {
            Schema::create('activity_logs', function ($table) {
                $table->id('log_id');
            });
        }
    }

    public function down(): void
    {
        // No-op duplicate migration.
    }
};
