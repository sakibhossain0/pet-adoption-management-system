<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $successStories = SuccessStory::all();
        return response()->json($successStories, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:150',
            'story_text' => 'required|string',
            'photo_url' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'adoption_id' => 'required|integer|exists:adoptions,adoption_id|unique:success_stories,adoption_id',
        ]);

        $successStory = SuccessStory::create([
            'title' => $request->title,
            'story_text' => $request->story_text,
            'photo_url' => $request->photo_url,
            'date' => $request->date,
            'adoption_id' => $request->adoption_id,
        ]);

        return response()->json([
            'message' => 'Success story created successfully',
            'data' => $successStory
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $successStory = SuccessStory::find($id);

        if (!$successStory) {
            return response()->json(['message' => 'Success story not found'], 404);
        }

        return response()->json($successStory, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $successStory = SuccessStory::find($id);

        if (!$successStory) {
            return response()->json(['message' => 'Success story not found'], 404);
        }

        $request->validate([
            'title' => 'required|string|max:150',
            'story_text' => 'required|string',
            'photo_url' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'adoption_id' => 'required|integer|exists:adoptions,adoption_id|unique:success_stories,adoption_id,' . $id . ',story_id',
        ]);

        $successStory->title = $request->title;
        $successStory->story_text = $request->story_text;
        $successStory->photo_url = $request->photo_url;
        $successStory->date = $request->date;
        $successStory->adoption_id = $request->adoption_id;
        $successStory->save();

        return response()->json([
            'message' => 'Success story updated successfully',
            'data' => $successStory
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $successStory = SuccessStory::find($id);

        if (!$successStory) {
            return response()->json(['message' => 'Success story not found'], 404);
        }

        $successStory->delete();

        return response()->json(['message' => 'Success story deleted successfully'], 200);
    }
    }
}
