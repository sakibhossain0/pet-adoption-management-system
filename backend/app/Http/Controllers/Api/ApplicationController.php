<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function index()
    {
        $applications = Application::all();
        return response()->json($applications, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'status' => 'required|string|max:30',
            'submission_date' => 'required|date',
            'uid' => 'required|integer|exists:users,uid',
            'pet_id' => 'required|integer|exists:pets,pet_id',
        ]);

        $application = Application::create([
            'status' => $request->status,
            'submission_date' => $request->submission_date,
            'uid' => $request->uid,
            'pet_id' => $request->pet_id,
        ]);

        return response()->json([
            'message' => 'Application created successfully',
            'data' => $application
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

        $request->validate([
            'status' => 'required|string|max:30',
            'submission_date' => 'required|date',
            'uid' => 'required|integer|exists:users,uid',
            'pet_id' => 'required|integer|exists:pets,pet_id',
        ]);

        $application->status = $request->status;
        $application->submission_date = $request->submission_date;
        $application->uid = $request->uid;
        $application->pet_id = $request->pet_id;
        $application->save();

        return response()->json([
            'message' => 'Application updated successfully',
            'data' => $application
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

 
