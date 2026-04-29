<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Adoption;
use Illuminate\Http\Request;

class AdoptionController extends Controller
{
    public function index()
    {
        $adoptions = Adoption::all();
        return response()->json($adoptions, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'adoption_date' => 'required|date',
            'app_id' => 'required|integer|exists:applications,app_id|unique:adoptions,app_id',
        ]);

        $adoption = Adoption::create([
            'adoption_date' => $request->adoption_date,
            'app_id' => $request->app_id,
        ]);

        return response()->json([
            'message' => 'Adoption created successfully',
            'data' => $adoption
        ], 201);
    }

    public function show(string $id)
    {
        $adoption = Adoption::find($id);

        if (!$adoption) {
            return response()->json(['message' => 'Adoption not found'], 404);
        }

        return response()->json($adoption, 200);
    }

    public function update(Request $request, string $id)
    {
        $adoption = Adoption::find($id);

        if (!$adoption) {
            return response()->json(['message' => 'Adoption not found'], 404);
        }

        $request->validate([
            'adoption_date' => 'required|date',
            'app_id' => 'required|integer|exists:applications,app_id|unique:adoptions,app_id,' . $id . ',adoption_id',
        ]);

        $adoption->adoption_date = $request->adoption_date;
        $adoption->app_id = $request->app_id;
        $adoption->save();

        return response()->json([
            'message' => 'Adoption updated successfully',
            'data' => $adoption
        ], 200);
    }

    public function destroy(string $id)
    {
        $adoption = Adoption::find($id);

        if (!$adoption) {
            return response()->json(['message' => 'Adoption not found'], 404);
        }

        $adoption->delete();

        return response()->json(['message' => 'Adoption deleted successfully'], 200);
    }
}

