<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    private function savePhoto(Request $request, ?string $oldPath = null): ?string
    {
        if (!$request->hasFile('photo')) {
            return $oldPath;
        }

        if ($oldPath) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $oldPath));
        }

        return '/storage/' . $request->file('photo')->store('users', 'public');
    }

    public function index()
    {
        return response()->json(User::orderBy('uid', 'desc')->get(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'nullable|string|max:20',
            'email' => 'required|email|max:150|unique:users,email',
            'password' => 'required|string|min:6',
            'photo' => 'nullable|image|max:2048',
            'lifestyle_type' => 'nullable|string|max:50',
            'housing_type' => 'nullable|string|max:50',
            'skill_level' => 'nullable|string|max:50',
            'availability' => 'nullable|string|max:100',
            'access_code' => 'nullable|string|max:50',
            'admin_level' => 'nullable|string|max:50',
            'user_type' => ['required', Rule::in(['ADOPTER', 'VOLUNTEER', 'ADMIN'])],
        ]);

        $data['password'] = Hash::make($data['password']);
        $data['photo_url'] = $this->savePhoto($request);
        unset($data['photo']);

        $user = User::create($data);

        return response()->json([
            'message' => 'User created successfully',
            'data' => $user,
        ], 201);
    }

    public function show(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user, 200);
    }

    public function update(Request $request, string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $data = $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'nullable|string|max:20',
            'email' => 'required|email|max:150|unique:users,email,' . $id . ',uid',
            'password' => 'nullable|string|min:6',
            'photo' => 'nullable|image|max:2048',
            'lifestyle_type' => 'nullable|string|max:50',
            'housing_type' => 'nullable|string|max:50',
            'skill_level' => 'nullable|string|max:50',
            'availability' => 'nullable|string|max:100',
            'access_code' => 'nullable|string|max:50',
            'admin_level' => 'nullable|string|max:50',
            'user_type' => ['required', Rule::in(['ADOPTER', 'VOLUNTEER', 'ADMIN'])],
        ]);

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $data['photo_url'] = $this->savePhoto($request, $user->photo_url);
        unset($data['photo']);

        $user->update($data);

        return response()->json([
            'message' => 'User updated successfully',
            'data' => $user,
        ], 200);
    }

    public function destroy(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($user->photo_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $user->photo_url));
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
