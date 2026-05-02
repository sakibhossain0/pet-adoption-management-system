<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ShelterController;
use App\Http\Controllers\Api\FosterParentController;
use App\Http\Controllers\Api\PetController;
use App\Http\Controllers\Api\MedicalRecordController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\AdoptionController;
use App\Http\Controllers\Api\SuccessStoryController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\QuizQuestionController;
use App\Http\Controllers\Api\QuizResponseController;
use App\Http\Controllers\Api\ActivityLogController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('me', [AuthController::class, 'me']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('my-adoptions', [AdoptionController::class, 'myAdoptions']);

// Public read-only content for the site.
Route::apiResource('pets', PetController::class)->only(['index', 'show']);
Route::apiResource('success-stories', SuccessStoryController::class)->only(['index', 'show']);
Route::apiResource('quiz-questions', QuizQuestionController::class)->only(['index', 'show']);

// Actions that must come from a logged-in user.
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('success-stories', SuccessStoryController::class)->except(['index', 'show']);
    Route::apiResource('quiz-responses', QuizResponseController::class);
});

// Admin/dashboard resources. The dashboard page is already hidden from non-admin users in the frontend.
Route::apiResource('users', UserController::class);
Route::apiResource('shelters', ShelterController::class);
Route::apiResource('foster-parents', FosterParentController::class);
Route::apiResource('pets', PetController::class)->except(['index', 'show']);
Route::apiResource('medical-records', MedicalRecordController::class);
Route::apiResource('applications', ApplicationController::class);
Route::apiResource('adoptions', AdoptionController::class);
Route::apiResource('donations', DonationController::class);
Route::apiResource('quiz-questions', QuizQuestionController::class)->except(['index', 'show']);
Route::apiResource('activity-logs', ActivityLogController::class);
