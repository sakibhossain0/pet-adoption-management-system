<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Show all users
     */
    public function index()
    {
        $users = User::all();

        return response()->json($users, 200);
    }

    /**
     * Create a new user
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'nullable|string|max:20',
            'email' => 'required|email|max:150|unique:users,email',
            'password' => 'required|string|min:6',
            'lifestyle_type' => 'nullable|string|max:50',
            'housing_type' => 'nullable|string|max:50',
            'skill_level' => 'nullable|string|max:50',
            'availability' => 'nullable|string|max:100',
            'access_code' => 'nullable|string|max:50',
            'admin_level' => 'nullable|string|max:50',
            'user_type' => 'required|in:ADOPTER,VOLUNTEER,ADMIN',
        ]);

        $user = User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'lifestyle_type' => $request->lifestyle_type,
            'housing_type' => $request->housing_type,
            'skill_level' => $request->skill_level,
            'availability' => $request->availability,
            'access_code' => $request->access_code,
            'admin_level' => $request->admin_level,
            'user_type' => $request->user_type,
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'data' => $user
        ], 201);
    }

    /**
     * Show one user by uid
     */
    public function show(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        return response()->json($user, 200);
    }

    /**
     * Update user
     */
    public function update(Request $request, string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'nullable|string|max:20',
            'email' => 'required|email|max:150|unique:users,email,' . $id . ',uid',
            'password' => 'nullable|string|min:6',
            'lifestyle_type' => 'nullable|string|max:50',
            'housing_type' => 'nullable|string|max:50',
            'skill_level' => 'nullable|string|max:50',
            'availability' => 'nullable|string|max:100',
            'access_code' => 'nullable|string|max:50',
            'admin_level' => 'nullable|string|max:50',
            'user_type' => 'required|in:ADOPTER,VOLUNTEER,ADMIN',
        ]);

        $user->name = $request->name;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->lifestyle_type = $request->lifestyle_type;
        $user->housing_type = $request->housing_type;
        $user->skill_level = $request->skill_level;
        $user->availability = $request->availability;
        $user->access_code = $request->access_code;
        $user->admin_level = $request->admin_level;
        $user->user_type = $request->user_type;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json([
            'message' => 'User updated successfully',
            'data' => $user
        ], 200);
    }

    /**
     * Delete user
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ], 200);
    }
}