<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassroomController;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/classrooms', [ClassroomController::class, 'store']);
