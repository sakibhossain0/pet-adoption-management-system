<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PetController extends Controller
{
    private function savePhoto(Request $request, ?string $oldPath = null): ?string
    {
        if (!$request->hasFile('photo')) {
            return $oldPath;
        }

        if ($oldPath) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $oldPath));
        }

        return '/storage/' . $request->file('photo')->store('pets', 'public');
    }

    public function index()
    {
        return response()->json(Pet::orderBy('pet_id', 'desc')->get(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'age' => 'nullable|integer|min:0',
            'gender' => 'nullable|string|max:20',
            'breed' => 'nullable|string|max:80',
            'temperament' => 'nullable|string|max:120',
            'adopt_status' => 'required|string|max:30',
            'species' => 'required|string|max:50',
            'description' => 'nullable|string|max:2000',
            'photo' => 'nullable|image|max:2048',
            'shid' => 'nullable|integer|exists:shelters,shid',
            'fid' => 'nullable|integer|exists:foster_parents,fid',
        ]);

        $data['photo_url'] = $this->savePhoto($request);
        unset($data['photo']);

        $pet = Pet::create($data);

        return response()->json([
            'message' => 'Pet created successfully',
            'data' => $pet,
        ], 201);
    }

    public function show(string $id)
    {
        $pet = Pet::find($id);

        if (!$pet) {
            return response()->json(['message' => 'Pet not found'], 404);
        }

        return response()->json($pet, 200);
    }

    public function update(Request $request, string $id)
    {
        $pet = Pet::find($id);

        if (!$pet) {
            return response()->json(['message' => 'Pet not found'], 404);
        }

        $data = $request->validate([
            'name' => 'required|string|max:100',
            'age' => 'nullable|integer|min:0',
            'gender' => 'nullable|string|max:20',
            'breed' => 'nullable|string|max:80',
            'temperament' => 'nullable|string|max:120',
            'adopt_status' => 'required|string|max:30',
            'species' => 'required|string|max:50',
            'description' => 'nullable|string|max:2000',
            'photo' => 'nullable|image|max:2048',
            'shid' => 'nullable|integer|exists:shelters,shid',
            'fid' => 'nullable|integer|exists:foster_parents,fid',
        ]);

        $data['photo_url'] = $this->savePhoto($request, $pet->photo_url);
        unset($data['photo']);

        $pet->update($data);

        return response()->json([
            'message' => 'Pet updated successfully',
            'data' => $pet,
        ], 200);
    }

    public function destroy(string $id)
    {
        $pet = Pet::find($id);

        if (!$pet) {
            return response()->json(['message' => 'Pet not found'], 404);
        }

        if ($pet->photo_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $pet->photo_url));
        }

        $pet->delete();

        return response()->json(['message' => 'Pet deleted successfully'], 200);
    }
}
