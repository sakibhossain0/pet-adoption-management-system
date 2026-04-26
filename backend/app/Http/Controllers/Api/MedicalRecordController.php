<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MedicalRecord;
use Illuminate\Http\Request;

class MedicalRecordController extends Controller
{
    /**
     * Show all medical records
     */
    public function index()
    {
        $medicalRecords = MedicalRecord::all();

        return response()->json($medicalRecords, 200);
    }

    /**
     * Create a new medical record
     */
    public function store(Request $request)
    {
        $request->validate([
            'treatment' => 'required|string|max:255',
            'cost' => 'required|numeric|min:0',
            'date' => 'required|date',
            'pet_id' => 'required|integer|exists:pets,pet_id',
        ]);

        $medicalRecord = MedicalRecord::create([
            'treatment' => $request->treatment,
            'cost' => $request->cost,
            'date' => $request->date,
            'pet_id' => $request->pet_id,
        ]);

        return response()->json([
            'message' => 'Medical record created successfully',
            'data' => $medicalRecord
        ], 201);
    }

    /**
     * Show one medical record by mid
     */
    public function show(string $id)
    {
        $medicalRecord = MedicalRecord::find($id);

        if (!$medicalRecord) {
            return response()->json([
                'message' => 'Medical record not found'
            ], 404);
        }

        return response()->json($medicalRecord, 200);
    }

    /**
     * Update medical record
     */
    public function update(Request $request, string $id)
    {
        $medicalRecord = MedicalRecord::find($id);

        if (!$medicalRecord) {
            return response()->json([
                'message' => 'Medical record not found'
            ], 404);
        }

        $request->validate([
            'treatment' => 'required|string|max:255',
            'cost' => 'required|numeric|min:0',
            'date' => 'required|date',
            'pet_id' => 'required|integer|exists:pets,pet_id',
        ]);

        $medicalRecord->treatment = $request->treatment;
        $medicalRecord->cost = $request->cost;
        $medicalRecord->date = $request->date;
        $medicalRecord->pet_id = $request->pet_id;

        $medicalRecord->save();

        return response()->json([
            'message' => 'Medical record updated successfully',
            'data' => $medicalRecord
        ], 200);
    }

    /**
     * Delete medical record
     */
    public function destroy(string $id)
    {
        $medicalRecord = MedicalRecord::find($id);

        if (!$medicalRecord) {
            return response()->json([
                'message' => 'Medical record not found'
            ], 404);
        }

        $medicalRecord->delete();

        return response()->json([
            'message' => 'Medical record deleted successfully'
        ], 200);
    }
}