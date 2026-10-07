<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DoctorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// (Laravel added this; we don't use it)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Doctors: list all (for the dropdown)
Route::get('/doctors', [DoctorController::class, 'index']);

// Appointments: full CRUD
Route::get('/appointments', [AppointmentController::class, 'index']);                   // list all
Route::post('/appointments', [AppointmentController::class, 'store']);                  // add new
Route::get('/appointments/{appointment}', [AppointmentController::class, 'show']);      // get one
Route::put('/appointments/{appointment}', [AppointmentController::class, 'update']);    // update
Route::delete('/appointments/{appointment}', [AppointmentController::class, 'destroy']); // delete