<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\StudentController; // ✅ Importado

// Ruta pública para login
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas con Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // ✅ Crear nueva clase
    Route::post('/classrooms', [ClassroomController::class, 'store']);

    // ✅ Obtener clases creadas por el maestro autenticado
    Route::get('/teacher/classes', [ClassroomController::class, 'getTeacherClasses']);

    // 🔍 Buscar alumnos por nombre o matrícula
    Route::get('/students/search', [StudentController::class, 'search']);

    // ➕ Agregar alumno a una clase
    Route::post('/classrooms/{classroom}/add-student', [StudentController::class, 'addStudent']);

    // Obtener detalle de clase + alumnos
    Route::get('/classrooms/{id}', [ClassroomController::class, 'show']);

    Route::delete('/classrooms/{classroom}/remove-student/{student}', [StudentController::class, 'removeStudent']);

    Route::get('/search-students', [StudentController::class, 'search']); // 👈 ESTA ES LA CLAVE

});
