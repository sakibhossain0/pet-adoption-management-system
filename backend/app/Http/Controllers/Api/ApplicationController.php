<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Adoption;
use App\Models\Application;
use App\Models\Pet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ApplicationController extends Controller
{
    private function normalizedStatus(?string $status): string
    {
        return strtolower(trim((string) $status));
    }

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

    private function syncApplicationApproval(Application $application): void
    {
        $status = $this->normalizedStatus($application->status);

        if ($status === 'approved') {
            Adoption::updateOrCreate(
                ['app_id' => $application->app_id],
                ['adoption_date' => now()->toDateString()]
            );

            Application::where('pet_id', $application->pet_id)
                ->where('app_id', '!=', $application->app_id)
                ->whereRaw('LOWER(status) != ?', ['rejected'])
                ->update(['status' => 'Rejected']);

            Pet::where('pet_id', $application->pet_id)->update(['adopt_status' => 'Adopted']);
            return;
        }

        Adoption::where('app_id', $application->app_id)->delete();
        $this->refreshPetStatus((int) $application->pet_id);
    }

    public function index()
    {
        return response()->json(Application::orderBy('app_id', 'desc')->get(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'status' => ['nullable', 'string', 'max:30', Rule::in(['Pending', 'Approved', 'Rejected'])],
            'submission_date' => 'nullable|date',
            'uid' => 'required|integer|exists:users,uid',
            'pet_id' => 'required|integer|exists:pets,pet_id',
            'applicant_name' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:150',
            'housing_type' => 'nullable|string|max:80',
            'other_pets' => 'nullable|string|max:80',
            'daily_availability' => 'nullable|string|max:100',
        ]);

        $data['status'] = $data['status'] ?? 'Pending';
        $data['submission_date'] = $data['submission_date'] ?? now()->toDateString();

        $application = DB::transaction(function () use ($data) {
            $application = Application::create($data);
            $this->syncApplicationApproval($application);

            return $application->refresh();
        });

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
            'status' => ['required', 'string', 'max:30', Rule::in(['Pending', 'Approved', 'Rejected'])],
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

        $oldPetId = (int) $application->pet_id;

        $application = DB::transaction(function () use ($application, $data, $oldPetId) {
            $application->update($data);
            $application->refresh();
            $this->syncApplicationApproval($application);

            if ($oldPetId !== (int) $application->pet_id) {
                $this->refreshPetStatus($oldPetId);
            }

            return $application->refresh();
        });

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

        $petId = (int) $application->pet_id;

        DB::transaction(function () use ($application, $petId) {
            Adoption::where('app_id', $application->app_id)->delete();
            $application->delete();
            $this->refreshPetStatus($petId);
        });

        return response()->json(['message' => 'Application deleted successfully'], 200);
    }
}
