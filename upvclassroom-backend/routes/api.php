<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\TemaController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\StudentSearchController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\MaterialController;

// 🔓 Ruta pública para login
Route::post('/login', [AuthController::class, 'login']);

// 🔐 Rutas protegidas con Sanctum
Route::middleware('auth:sanctum')->group(function () {

    // 🧑‍🏫 Crear nueva clase (maestro)
    Route::post('/classrooms', [ClassroomController::class, 'store']);

    // 🧑‍🏫 Obtener clases creadas por el maestro
    Route::get('/teacher/classes', [ClassroomController::class, 'getTeacherClasses']);

    // 📚 Obtener clases inscritas por el alumno autenticado
    Route::get('/student/classes', [StudentController::class, 'myClasses']);

    // 🔍 Buscar alumnos por nombre o email
    Route::get('/students/search', [StudentController::class, 'search']);

    // ➕ Agregar alumno a una clase
    Route::post('/classrooms/{classroom}/add-student', [StudentController::class, 'addStudent']);

    // ➖ Eliminar alumno de una clase
    Route::delete('/classrooms/{classroom}/remove-student/{student}', [StudentController::class, 'removeStudent']);

    // 📄 Obtener detalles de una clase (con alumnos)
    Route::get('/classrooms/{id}', [ClassroomController::class, 'show']);

    // 📢 Avisos: obtener y crear
    Route::get('/classrooms/{id}/notices', [NoticeController::class, 'index']);
    Route::post('/classrooms/{id}/notices', [NoticeController::class, 'store']);

    // 📑 Registrar nuevo tema
    Route::post('/temas', [TemaController::class, 'store']);

    // 📝 Registrar nueva tarea
    Route::post('/tareas', [TareaController::class, 'store']);

    Route::get('/student/classrooms/{id}', [ClassroomController::class, 'showForStudent']);

    // Definir la ruta para buscar estudiantes
    Route::get('/search-students', [StudentController::class, 'search']);

    Route::get('/teacher/classes/{classroom}/create-topic', [TopicController::class, 'create'])->name('teacher.class.createTopic');
    
    // Ruta para registrar una nueva tarea
    Route::get('/teacher/classes/{classroom}/create-task', [TaskController::class, 'create'])->name('teacher.class.createTask');
    
    // Ruta para registrar nuevo material
    Route::get('/teacher/classes/{classroom}/create-material', [MaterialController::class, 'create'])->name('teacher.class.createMaterial');

    Route::post('/classrooms/{id}/topics', [TopicController::class, 'store']);
    
    Route::get('/classrooms/{id}/topics', [TopicController::class, 'index']);

    Route::post('/classrooms/{id}/tasks', [TaskController::class, 'store']);

    Route::get('/classrooms/{id}/tasks', [TaskController::class, 'index']);

    Route::post('/topics/{id}/materials', [MaterialController::class, 'store']);

    Route::get('/classrooms/{id}/materials', [MaterialController::class, 'index']);

});
