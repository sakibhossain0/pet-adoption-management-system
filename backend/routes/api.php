<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PetController;
use App\Http\Controllers\Api\MedicalRecordController;
use App\Http\Controllers\Api\ShelterController;
use App\Http\Controllers\Api\FosterParentController;

Route::apiResource('users', UserController::class);
Route::apiResource('pets', PetController::class);
Route::apiResource('medical-records', MedicalRecordController::class);
Route::apiResource('shelters', ShelterController::class);
Route::apiResource('foster-parents', FosterParentController::class);