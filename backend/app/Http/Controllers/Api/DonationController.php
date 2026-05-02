<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    public function index()
    {
        return response()->json(Donation::orderBy('did', 'desc')->get(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'status' => 'required|string|max:30',
            'date' => 'required|date',
            'amount' => 'required|numeric|gt:0',
            'uid' => 'required|integer|exists:users,uid',
            'shid' => 'required|integer|exists:shelters,shid',
        ]);

        $donation = Donation::create($data);

        return response()->json([
            'message' => 'Donation created successfully',
            'data' => $donation,
        ], 201);
    }

    public function show(string $id)
    {
        $donation = Donation::find($id);

        if (!$donation) {
            return response()->json(['message' => 'Donation not found'], 404);
        }

        return response()->json($donation, 200);
    }

    public function update(Request $request, string $id)
    {
        $donation = Donation::find($id);

        if (!$donation) {
            return response()->json(['message' => 'Donation not found'], 404);
        }

        $data = $request->validate([
            'status' => 'required|string|max:30',
            'date' => 'required|date',
            'amount' => 'required|numeric|gt:0',
            'uid' => 'required|integer|exists:users,uid',
            'shid' => 'required|integer|exists:shelters,shid',
        ]);

        $donation->update($data);

        return response()->json([
            'message' => 'Donation updated successfully',
            'data' => $donation,
        ], 200);
    }

    public function destroy(string $id)
    {
        $donation = Donation::find($id);

        if (!$donation) {
            return response()->json(['message' => 'Donation not found'], 404);
        }

        $donation->delete();

        return response()->json(['message' => 'Donation deleted successfully'], 200);
    }
}
