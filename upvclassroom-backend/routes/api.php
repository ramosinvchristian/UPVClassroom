<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassroomController;

// Ruta pública para login
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas con Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // Crear nueva clase
    Route::post('/classrooms', [ClassroomController::class, 'store']);

    // Obtener clases creadas por el maestro autenticado
    Route::get('/teacher/classes', [ClassroomController::class, 'getTeacherClasses']);
});
