<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Classroom;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    // Buscar estudiantes por nombre o matrícula
    public function search(Request $request)
    {
        $search = $request->input('query');

        $students = User::where('role', 'student')
            ->where(function ($query) use ($search) {
                $query->where('name', 'like', "%$search%")
                      ->orWhere('email', 'like', "%$search%");
            })
            ->get();

        return response()->json($students);
    }

    // Asociar un estudiante a una clase
    public function addStudent(Request $request, $classroom_id)
    {
        $request->validate([
            'student_id' => 'required|exists:users,id',
        ]);

        $classroom = Classroom::findOrFail($classroom_id);
        $studentId = $request->input('student_id');

        if ($classroom->students()->where('user_id', $studentId)->exists()) {
            return response()->json(['message' => 'El alumno ya está en la clase.'], 409);
        }

        $classroom->students()->attach($studentId);

        return response()->json(['message' => 'Alumno agregado a la clase correctamente.']);
    }

    // Eliminar un alumno de una clase
    public function removeStudent($classroomId, $studentId)
    {
        $classroom = Classroom::findOrFail($classroomId);
        $student = User::where('id', $studentId)->where('role', 'student')->firstOrFail();

        if ($classroom->students()->where('user_id', $studentId)->exists()) {
            $classroom->students()->detach($studentId);
            return response()->json(['message' => 'Alumno eliminado correctamente.']);
        }

        return response()->json(['message' => 'El alumno no está registrado en esta clase.'], 404);
    }

    // 🆕 Obtener clases en las que está inscrito el alumno autenticado
    public function myClasses(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'student') {
            return response()->json(['message' => 'No autorizado.'], 403);
        }

        $classes = $user->enrolledClasses()->withCount('students')->get();

        return response()->json([
            'message' => 'Clases inscritas correctamente.',
            'classes' => $classes
        ]);
    }
}
