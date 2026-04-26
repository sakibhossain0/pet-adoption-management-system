<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Shelter;
use Illuminate\Http\Request;

class ShelterController extends Controller
{
    /**
     * Show all shelters
     */
    public function index()
    {
        $shelters = Shelter::all();

        return response()->json($shelters, 200);
    }

    /**
     * Create a new shelter
     */
    public function store(Request $request)
    {
        $request->validate([
            'shelter_name' => 'required|string|max:120',
            'contact_no' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'capacity' => 'required|integer|min:0',
        ]);

        $shelter = Shelter::create([
            'shelter_name' => $request->shelter_name,
            'contact_no' => $request->contact_no,
            'address' => $request->address,
            'capacity' => $request->capacity,
        ]);

        return response()->json([
            'message' => 'Shelter created successfully',
            'data' => $shelter
        ], 201);
    }

    /**
     * Show one shelter by shid
     */
    public function show(string $id)
    {
        $shelter = Shelter::find($id);

        if (!$shelter) {
            return response()->json([
                'message' => 'Shelter not found'
            ], 404);
        }

        return response()->json($shelter, 200);
    }

    /**
     * Update shelter
     */
    public function update(Request $request, string $id)
    {
        $shelter = Shelter::find($id);

        if (!$shelter) {
            return response()->json([
                'message' => 'Shelter not found'
            ], 404);
        }

        $request->validate([
            'shelter_name' => 'required|string|max:120',
            'contact_no' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'capacity' => 'required|integer|min:0',
        ]);

        $shelter->shelter_name = $request->shelter_name;
        $shelter->contact_no = $request->contact_no;
        $shelter->address = $request->address;
        $shelter->capacity = $request->capacity;

        $shelter->save();

        return response()->json([
            'message' => 'Shelter updated successfully',
            'data' => $shelter
        ], 200);
    }

    /**
     * Delete shelter
     */
    public function destroy(string $id)
    {
        $shelter = Shelter::find($id);

        if (!$shelter) {
            return response()->json([
                'message' => 'Shelter not found'
            ], 404);
        }

        $shelter->delete();

        return response()->json([
            'message' => 'Shelter deleted successfully'
        ], 200);
    }
}