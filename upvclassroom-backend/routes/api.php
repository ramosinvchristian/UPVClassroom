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
use App\Http\Controllers\TaskSubmissionController;

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

    // 📄 Ver clase como alumno
    Route::get('/student/classrooms/{id}', [ClassroomController::class, 'showForStudent']);

    // 📢 Avisos
    Route::get('/classrooms/{id}/notices', [NoticeController::class, 'index']);
    Route::post('/classrooms/{id}/notices', [NoticeController::class, 'store']);

    // 📑 Temas
    Route::post('/classrooms/{id}/topics', [TopicController::class, 'store']);
    Route::get('/classrooms/{id}/topics', [TopicController::class, 'index']);
    Route::get('/classrooms/{id}/temas-contenido', [TopicController::class, 'contenidoPorClase']);

    // 📝 Tareas
    Route::post('/classrooms/{id}/tasks', [TaskController::class, 'store']);
    Route::get('/classrooms/{id}/tasks', [TaskController::class, 'index']);

    // 📎 Materiales
    Route::post('/topics/{id}/materials', [MaterialController::class, 'store']);
    Route::get('/classrooms/{id}/materials', [MaterialController::class, 'index']);
    Route::put('/materials/{id}', [MaterialController::class, 'update']);
    Route::delete('/materials/{id}', [MaterialController::class, 'destroy']);

    // 🔍 Formularios de maestro (para front)
    Route::get('/teacher/classes/{classroom}/create-topic', [TopicController::class, 'create'])->name('teacher.class.createTopic');
    Route::get('/teacher/classes/{classroom}/create-task', [TaskController::class, 'create'])->name('teacher.class.createTask');
    Route::get('/teacher/classes/{classroom}/create-material', [MaterialController::class, 'create'])->name('teacher.class.createMaterial');

    // 🧑‍🎓 Entregas del alumno
    Route::post('/tasks/{taskId}/submit', [TaskSubmissionController::class, 'store']);
    Route::get('/student/classrooms/{classroomId}/submissions', [TaskSubmissionController::class, 'index']);

    // 🧑‍🏫 Maestro: ver y calificar entregas
    Route::get('/tasks/{taskId}/submissions', [TaskSubmissionController::class, 'showSubmissions']);
    Route::post('/submissions/{submissionId}/grade', [TaskSubmissionController::class, 'grade']);

    // 🧑‍🏫 Ver entregas de una tarea
    Route::get('/tasks/{task}/submissions', [TaskSubmissionController::class, 'listByTask']);

    // 🧑‍🏫 Calificar una entrega
    Route::put('/submissions/{submission}/grade', [TaskSubmissionController::class, 'grade']);
});
