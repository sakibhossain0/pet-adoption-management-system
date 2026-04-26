<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pet;
use Illuminate\Http\Request;

class PetController extends Controller
{
    /**
     * Show all pets
     */
    public function index()
    {
        $pets = Pet::all();

        return response()->json($pets, 200);
    }

    /**
     * Create a new pet
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'age' => 'nullable|integer|min:0',
            'gender' => 'nullable|string|max:20',
            'breed' => 'nullable|string|max:80',
            'temperament' => 'nullable|string|max:80',
            'adopt_status' => 'required|string|max:30',
            'species' => 'required|string|max:50',
            'shid' => 'required|integer|exists:shelters,shid',
            'fid' => 'nullable|integer|exists:foster_parents,fid',
        ]);

        $pet = Pet::create([
            'name' => $request->name,
            'age' => $request->age,
            'gender' => $request->gender,
            'breed' => $request->breed,
            'temperament' => $request->temperament,
            'adopt_status' => $request->adopt_status,
            'species' => $request->species,
            'shid' => $request->shid,
            'fid' => $request->fid,
        ]);

        return response()->json([
            'message' => 'Pet created successfully',
            'data' => $pet
        ], 201);
    }

    /**
     * Show one pet by pet_id
     */
    public function show(string $id)
    {
        $pet = Pet::find($id);

        if (!$pet) {
            return response()->json([
                'message' => 'Pet not found'
            ], 404);
        }

        return response()->json($pet, 200);
    }

    /**
     * Update pet
     */
    public function update(Request $request, string $id)
    {
        $pet = Pet::find($id);

        if (!$pet) {
            return response()->json([
                'message' => 'Pet not found'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:100',
            'age' => 'nullable|integer|min:0',
            'gender' => 'nullable|string|max:20',
            'breed' => 'nullable|string|max:80',
            'temperament' => 'nullable|string|max:80',
            'adopt_status' => 'required|string|max:30',
            'species' => 'required|string|max:50',
            'shid' => 'required|integer|exists:shelters,shid',
            'fid' => 'nullable|integer|exists:foster_parents,fid',
        ]);

        $pet->name = $request->name;
        $pet->age = $request->age;
        $pet->gender = $request->gender;
        $pet->breed = $request->breed;
        $pet->temperament = $request->temperament;
        $pet->adopt_status = $request->adopt_status;
        $pet->species = $request->species;
        $pet->shid = $request->shid;
        $pet->fid = $request->fid;

        $pet->save();

        return response()->json([
            'message' => 'Pet updated successfully',
            'data' => $pet
        ], 200);
    }

    /**
     * Delete pet
     */
    public function destroy(string $id)
    {
        $pet = Pet::find($id);

        if (!$pet) {
            return response()->json([
                'message' => 'Pet not found'
            ], 404);
        }

        $pet->delete();

        return response()->json([
            'message' => 'Pet deleted successfully'
        ], 200);
    }
}
