<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FosterParent;
use Illuminate\Http\Request;

class FosterParentController extends Controller
{
    /**
     * Show all foster parents
     */
    public function index()
    {
        $fosterParents = FosterParent::all();

        return response()->json($fosterParents, 200);
    }

    /**
     * Create a new foster parent
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'housing_capacity' => 'nullable|integer|min:0',
            'experience' => 'nullable|integer|min:0',
        ]);

        $fosterParent = FosterParent::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'address' => $request->address,
            'housing_capacity' => $request->housing_capacity,
            'experience' => $request->experience,
        ]);

        return response()->json([
            'message' => 'Foster parent created successfully',
            'data' => $fosterParent
        ], 201);
    }

    /**
     * Show one foster parent by fid
     */
    public function show(string $id)
    {
        $fosterParent = FosterParent::find($id);

        if (!$fosterParent) {
            return response()->json([
                'message' => 'Foster parent not found'
            ], 404);
        }

        return response()->json($fosterParent, 200);
    }

    /**
     * Update foster parent
     */
    public function update(Request $request, string $id)
    {
        $fosterParent = FosterParent::find($id);

        if (!$fosterParent) {
            return response()->json([
                'message' => 'Foster parent not found'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'housing_capacity' => 'nullable|integer|min:0',
            'experience' => 'nullable|integer|min:0',
        ]);

        $fosterParent->name = $request->name;
        $fosterParent->phone = $request->phone;
        $fosterParent->address = $request->address;
        $fosterParent->housing_capacity = $request->housing_capacity;
        $fosterParent->experience = $request->experience;

        $fosterParent->save();

        return response()->json([
            'message' => 'Foster parent updated successfully',
            'data' => $fosterParent
        ], 200);
    }

    /**
     * Delete foster parent
     */
    public function destroy(string $id)
    {
        $fosterParent = FosterParent::find($id);

        if (!$fosterParent) {
            return response()->json([
                'message' => 'Foster parent not found'
            ], 404);
        }

        $fosterParent->delete();

        return response()->json([
            'message' => 'Foster parent deleted successfully'
        ], 200);
    }
}