<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $emails = env('ADMIN_EMAILS', env('ADMIN_EMAIL', 'admin@pawfectmatch.com'));
        $password = env('ADMIN_PASSWORD', 'admin12345');

        collect(explode(',', $emails))
            ->map(fn ($email) => strtolower(trim($email)))
            ->filter()
            ->unique()
            ->each(function (string $email) use ($password) {
                User::updateOrCreate(
                    ['email' => $email],
                    [
                        'name' => 'Pawfect Admin',
                        'phone' => '01700000000',
                        'password' => Hash::make($password),
                        'photo_url' => null,
                        'lifestyle_type' => null,
                        'housing_type' => null,
                        'skill_level' => null,
                        'availability' => null,
                        'access_code' => null,
                        'admin_level' => 'SUPER_ADMIN',
                        'user_type' => 'ADMIN',
                    ]
                );
            });
    }
}
