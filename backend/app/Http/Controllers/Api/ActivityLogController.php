<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    public function index()
    {
        return response()->json(ActivityLog::orderBy('log_id', 'desc')->get(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'activity' => 'required|string|max:150',
            'description' => 'nullable|string|max:1000',
            'time' => 'nullable|date',
            'uid' => 'nullable|integer|exists:users,uid',
        ]);

        $data['time'] = $data['time'] ?? now();
        $log = ActivityLog::create($data);

        return response()->json([
            'message' => 'Activity log created successfully',
            'data' => $log,
        ], 201);
    }

    public function show(string $id)
    {
        $log = ActivityLog::find($id);

        if (!$log) {
            return response()->json(['message' => 'Activity log not found'], 404);
        }

        return response()->json($log, 200);
    }

    public function update(Request $request, string $id)
    {
        $log = ActivityLog::find($id);

        if (!$log) {
            return response()->json(['message' => 'Activity log not found'], 404);
        }

        $data = $request->validate([
            'activity' => 'required|string|max:150',
            'description' => 'nullable|string|max:1000',
            'time' => 'nullable|date',
            'uid' => 'nullable|integer|exists:users,uid',
        ]);

        $log->update($data);

        return response()->json([
            'message' => 'Activity log updated successfully',
            'data' => $log,
        ], 200);
    }

    public function destroy(string $id)
    {
        $log = ActivityLog::find($id);

        if (!$log) {
            return response()->json(['message' => 'Activity log not found'], 404);
        }

        $log->delete();

        return response()->json(['message' => 'Activity log deleted successfully'], 200);
    }
}
