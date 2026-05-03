<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Adoption;
use App\Models\Application;
use App\Models\Pet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdoptionController extends Controller
{
    private function refreshPetStatus(int $petId): void
    {
        $hasAdoption = Adoption::query()
            ->join('applications', 'adoptions.app_id', '=', 'applications.app_id')
            ->where('applications.pet_id', $petId)
            ->exists();

        if ($hasAdoption) {
            Pet::where('pet_id', $petId)->update(['adopt_status' => 'Adopted']);
            return;
        }

        $hasPendingApplication = Application::where('pet_id', $petId)
            ->whereRaw('LOWER(status) = ?', ['pending'])
            ->exists();

        Pet::where('pet_id', $petId)->update([
            'adopt_status' => $hasPendingApplication ? 'Pending' : 'Available',
        ]);
    }

    private function approveApplication(Application $application): void
    {
        $application->update(['status' => 'Approved']);

        Application::where('pet_id', $application->pet_id)
            ->where('app_id', '!=', $application->app_id)
            ->whereRaw('LOWER(status) != ?', ['rejected'])
            ->update(['status' => 'Rejected']);

        Pet::where('pet_id', $application->pet_id)->update(['adopt_status' => 'Adopted']);
    }

    public function myAdoptions(Request $request)
    {
        $user = $request->user();

        $adoptions = Adoption::query()
            ->join('applications', 'adoptions.app_id', '=', 'applications.app_id')
            ->leftJoin('pets', 'applications.pet_id', '=', 'pets.pet_id')
            ->where('applications.uid', $user->uid)
            ->orderByDesc('adoptions.adoption_id')
            ->get([
                'adoptions.adoption_id',
                'adoptions.adoption_date',
                'adoptions.app_id',
                'applications.pet_id',
                'pets.name as pet_name',
                'pets.species',
                'pets.breed',
                'pets.photo_url as pet_photo_url',
            ]);

        return response()->json($adoptions, 200);
    }

    public function index()
    {
        $adoptions = Adoption::query()
            ->leftJoin('applications', 'adoptions.app_id', '=', 'applications.app_id')
            ->leftJoin('pets', 'applications.pet_id', '=', 'pets.pet_id')
            ->orderByDesc('adoptions.adoption_id')
            ->get([
                'adoptions.*',
                'applications.uid',
                'applications.pet_id',
                'pets.name as pet_name',
            ]);

        return response()->json($adoptions, 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'adoption_date' => 'required|date',
            'app_id' => 'required|integer|exists:applications,app_id|unique:adoptions,app_id',
        ]);

        $adoption = DB::transaction(function () use ($data) {
            $application = Application::findOrFail($data['app_id']);
            $this->approveApplication($application);

            return Adoption::create($data)->refresh();
        });

        return response()->json([
            'message' => 'Adoption created successfully',
            'data' => $adoption,
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

        $data = $request->validate([
            'adoption_date' => 'required|date',
            'app_id' => 'required|integer|exists:applications,app_id|unique:adoptions,app_id,' . $id . ',adoption_id',
        ]);

        $oldApplication = Application::find($adoption->app_id);
        $oldPetId = $oldApplication?->pet_id;

        $adoption = DB::transaction(function () use ($adoption, $data, $oldPetId) {
            $adoption->update($data);

            $application = Application::findOrFail($data['app_id']);
            $this->approveApplication($application);

            if ($oldPetId && (int) $oldPetId !== (int) $application->pet_id) {
                $this->refreshPetStatus((int) $oldPetId);
            }

            return $adoption->refresh();
        });

        return response()->json([
            'message' => 'Adoption updated successfully',
            'data' => $adoption,
        ], 200);
    }

    public function destroy(string $id)
    {
        $adoption = Adoption::find($id);

        if (!$adoption) {
            return response()->json(['message' => 'Adoption not found'], 404);
        }

        DB::transaction(function () use ($adoption) {
            $application = Application::find($adoption->app_id);
            $petId = $application?->pet_id;

            $adoption->delete();

            if ($application) {
                $application->update(['status' => 'Pending']);
            }

            if ($petId) {
                $this->refreshPetStatus((int) $petId);
            }
        });

        return response()->json(['message' => 'Adoption deleted successfully'], 200);
    }
}
