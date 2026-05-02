<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function index()
    {
        return response()->json(Application::orderBy('app_id', 'desc')->get(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'status' => 'required|string|max:30',
            'submission_date' => 'required|date',
            'uid' => 'required|integer|exists:users,uid',
            'pet_id' => 'required|integer|exists:pets,pet_id',
            'applicant_name' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:150',
            'housing_type' => 'nullable|string|max:80',
            'other_pets' => 'nullable|string|max:80',
            'daily_availability' => 'nullable|string|max:100',
        ]);

        $application = Application::create($data);

        return response()->json([
            'message' => 'Application created successfully',
            'data' => $application,
        ], 201);
    }

    public function show(string $id)
    {
        $application = Application::find($id);

        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        return response()->json($application, 200);
    }

    public function update(Request $request, string $id)
    {
        $application = Application::find($id);

        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        $data = $request->validate([
            'status' => 'required|string|max:30',
            'submission_date' => 'required|date',
            'uid' => 'required|integer|exists:users,uid',
            'pet_id' => 'required|integer|exists:pets,pet_id',
            'applicant_name' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:150',
            'housing_type' => 'nullable|string|max:80',
            'other_pets' => 'nullable|string|max:80',
            'daily_availability' => 'nullable|string|max:100',
        ]);

        $application->update($data);

        return response()->json([
            'message' => 'Application updated successfully',
            'data' => $application,
        ], 200);
    }

    public function destroy(string $id)
    {
        $application = Application::find($id);

        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        $application->delete();

        return response()->json(['message' => 'Application deleted successfully'], 200);
    }
}
