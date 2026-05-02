<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MedicalRecord;
use Illuminate\Http\Request;

class MedicalRecordController extends Controller
{
    public function index()
    {
        return response()->json(MedicalRecord::orderBy('mid', 'desc')->get(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'treatment' => 'required|string|max:255',
            'cost' => 'required|numeric|min:0',
            'date' => 'required|date',
            'note' => 'nullable|string|max:1000',
            'pet_id' => 'required|integer|exists:pets,pet_id',
        ]);

        $medicalRecord = MedicalRecord::create($data);

        return response()->json([
            'message' => 'Medical record created successfully',
            'data' => $medicalRecord,
        ], 201);
    }

    public function show(string $id)
    {
        $medicalRecord = MedicalRecord::find($id);

        if (!$medicalRecord) {
            return response()->json(['message' => 'Medical record not found'], 404);
        }

        return response()->json($medicalRecord, 200);
    }

    public function update(Request $request, string $id)
    {
        $medicalRecord = MedicalRecord::find($id);

        if (!$medicalRecord) {
            return response()->json(['message' => 'Medical record not found'], 404);
        }

        $data = $request->validate([
            'treatment' => 'required|string|max:255',
            'cost' => 'required|numeric|min:0',
            'date' => 'required|date',
            'note' => 'nullable|string|max:1000',
            'pet_id' => 'required|integer|exists:pets,pet_id',
        ]);

        $medicalRecord->update($data);

        return response()->json([
            'message' => 'Medical record updated successfully',
            'data' => $medicalRecord,
        ], 200);
    }

    public function destroy(string $id)
    {
        $medicalRecord = MedicalRecord::find($id);

        if (!$medicalRecord) {
            return response()->json(['message' => 'Medical record not found'], 404);
        }

        $medicalRecord->delete();

        return response()->json(['message' => 'Medical record deleted successfully'], 200);
    }
}
