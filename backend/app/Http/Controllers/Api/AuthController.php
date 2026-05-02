<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    private function storePhoto(Request $request): ?string
    {
        if (!$request->hasFile('photo')) {
            return null;
        }

        $path = $request->file('photo')->store('users', 'public');
        return '/storage/' . $path;
    }

    private function adminEmails(): array
    {
        $emails = env('ADMIN_EMAILS', env('ADMIN_EMAIL', 'admin@pawfectmatch.com'));

        return collect(explode(',', $emails))
            ->map(fn ($email) => strtolower(trim($email)))
            ->filter()
            ->unique()
            ->values()
            ->all();
    }

    private function adminPassword(): string
    {
        return env('ADMIN_PASSWORD', 'admin12345');
    }

    private function emailIsDefaultAdmin(string $email): bool
    {
        return in_array(strtolower(trim($email)), $this->adminEmails(), true);
    }

    /**
     * Keeps the required class-project admin login working even if the database
     * was migrated before the seeder was run. Configure more admin emails in .env:
     * ADMIN_EMAILS=admin@pawfectmatch.com,teacher@example.com
     * ADMIN_PASSWORD=admin12345
     */
    private function ensureDefaultAdminExists(string $email, string $password): void
    {
        if (!$this->emailIsDefaultAdmin($email) || $password !== $this->adminPassword()) {
            return;
        }

        User::updateOrCreate(
            ['email' => strtolower(trim($email))],
            [
                'name' => 'Pawfect Admin',
                'phone' => '01700000000',
                'password' => Hash::make($this->adminPassword()),
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
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'nullable|string|max:20',
            'email' => 'required|email|max:150|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'photo' => 'nullable|image|max:2048',
            'lifestyle_type' => 'nullable|string|max:50',
            'housing_type' => 'nullable|string|max:50',
            'skill_level' => 'nullable|string|max:50',
            'availability' => 'nullable|string|max:100',
        ]);

        $user = User::create([
            'name' => $data['name'],
            'phone' => $data['phone'] ?? null,
            'email' => strtolower(trim($data['email'])),
            'password' => Hash::make($data['password']),
            'photo_url' => $this->storePhoto($request),
            'lifestyle_type' => $data['lifestyle_type'] ?? null,
            'housing_type' => $data['housing_type'] ?? null,
            'skill_level' => $data['skill_level'] ?? null,
            'availability' => $data['availability'] ?? null,
            'user_type' => 'ADOPTER',
        ]);

        $token = $user->createToken('frontend')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'token' => $token,
            'user' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $email = strtolower(trim($credentials['email']));
        $password = $credentials['password'];

        $this->ensureDefaultAdminExists($email, $password);

        $user = User::whereRaw('LOWER(email) = ?', [$email])->first();

        if (!$user || !Hash::check($password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('frontend')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user,
            'is_admin' => strtoupper($user->user_type) === 'ADMIN',
        ]);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
