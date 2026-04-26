<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PetController;
use App\Http\Controllers\Api\MedicalRecordController;

Route::apiResource('users', UserController::class);
Route::apiResource('pets', PetController::class);
Route::apiResource('medical-records', MedicalRecordController::class);