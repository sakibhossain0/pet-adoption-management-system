<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Adoption;
use App\Models\SuccessStory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class SuccessStoryController extends Controller
{
    private function savePhoto(Request $request, ?string $oldPath = null): ?string
    {
        if (!$request->hasFile('photo')) {
            return $oldPath;
        }

        if ($oldPath) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $oldPath));
        }

        return '/storage/' . $request->file('photo')->store('success-stories', 'public');
    }

    private function userCanUseAdoption(Request $request, int $adoptionId): bool
    {
        $user = $request->user();

        if (!$user) {
            return false;
        }

        if (strtoupper((string) ($user->user_type ?? '')) === 'ADMIN') {
            return true;
        }

        return Adoption::query()
            ->join('applications', 'adoptions.app_id', '=', 'applications.app_id')
            ->where('adoptions.adoption_id', $adoptionId)
            ->where('applications.uid', $user->uid)
            ->exists();
    }

    public function index()
    {
        return response()->json(SuccessStory::orderBy('story_id', 'desc')->get(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:150',
            'story_text' => 'required|string',
            'date' => 'nullable|date',
            'photo' => 'nullable|image|max:2048',
            'adoption_id' => [
                'required',
                'integer',
                'exists:adoptions,adoption_id',
                Rule::unique('success_stories', 'adoption_id'),
            ],
        ]);

        if (!$this->userCanUseAdoption($request, (int) $data['adoption_id'])) {
            return response()->json([
                'message' => 'You can only share a success story for a pet you adopted.',
            ], 403);
        }

        $data['photo_url'] = $this->savePhoto($request);
        unset($data['photo']);

        $successStory = SuccessStory::create($data);

        return response()->json([
            'message' => 'Success story created successfully',
            'data' => $successStory,
        ], 201);
    }

    public function show(string $id)
    {
        $successStory = SuccessStory::find($id);

        if (!$successStory) {
            return response()->json(['message' => 'Success story not found'], 404);
        }

        return response()->json($successStory, 200);
    }

    public function update(Request $request, string $id)
    {
        $successStory = SuccessStory::find($id);

        if (!$successStory) {
            return response()->json(['message' => 'Success story not found'], 404);
        }

        $data = $request->validate([
            'title' => 'required|string|max:150',
            'story_text' => 'required|string',
            'date' => 'nullable|date',
            'photo' => 'nullable|image|max:2048',
            'adoption_id' => [
                'required',
                'integer',
                'exists:adoptions,adoption_id',
                Rule::unique('success_stories', 'adoption_id')->ignore($successStory->story_id, 'story_id'),
            ],
        ]);

        if (!$this->userCanUseAdoption($request, (int) $data['adoption_id'])) {
            return response()->json([
                'message' => 'You can only share a success story for a pet you adopted.',
            ], 403);
        }

        $data['photo_url'] = $this->savePhoto($request, $successStory->photo_url);
        unset($data['photo']);

        $successStory->update($data);

        return response()->json([
            'message' => 'Success story updated successfully',
            'data' => $successStory,
        ], 200);
    }

    public function destroy(string $id)
    {
        $successStory = SuccessStory::find($id);

        if (!$successStory) {
            return response()->json(['message' => 'Success story not found'], 404);
        }

        if ($successStory->photo_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $successStory->photo_url));
        }

        $successStory->delete();

        return response()->json(['message' => 'Success story deleted successfully'], 200);
    }
}
