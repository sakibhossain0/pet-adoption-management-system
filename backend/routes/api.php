<?php

use Illuminate\Support\Facades\Route;
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

Route::apiResource('users', UserController::class);
Route::apiResource('shelters', ShelterController::class);
Route::apiResource('foster-parents', FosterParentController::class);
Route::apiResource('pets', PetController::class);
Route::apiResource('medical-records', MedicalRecordController::class);
Route::apiResource('applications', ApplicationController::class);
Route::apiResource('adoptions', AdoptionController::class);
Route::apiResource('success-stories', SuccessStoryController::class);
Route::apiResource('donations', DonationController::class);
Route::apiResource('quiz-questions', QuizQuestionController::class);
Route::apiResource('quiz-responses', QuizResponseController::class);
Route::apiResource('activity-logs', ActivityLogController::class);