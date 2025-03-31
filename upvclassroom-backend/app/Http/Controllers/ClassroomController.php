<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClassroomController extends Controller
{
    // Crear clase
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'group_code' => 'required|string|unique:classes,group_code',
            'career' => 'required|string',
            'cuatrimestre' => 'required|string',
        ]);

        $classroom = Classroom::create([
            'teacher_id' => Auth::id(),
            'name' => $request->name,
            'description' => $request->description,
            'group_code' => $request->group_code,
            'career' => $request->career,
            'cuatrimestre' => $request->cuatrimestre,
        ]);

        return response()->json([
            'message' => 'Clase creada exitosamente',
            'classroom' => $classroom
        ], 201);
    }

    // Obtener clases creadas por el maestro autenticado
    public function getTeacherClasses(Request $request)
    {
        $user = $request->user();

        if ($user->role !== 'teacher') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $classes = Classroom::where('teacher_id', $user->id)->get();
        return response()->json($classes);
    }

    // Obtener detalle de una clase (incluye alumnos y avisos)
    public function show($id)
    {
        $classroom = Classroom::with('students')->find($id);

        if (!$classroom) {
            return response()->json(['message' => 'Clase no encontrada.'], 404);
        }

        if (auth()->id() !== $classroom->teacher_id) {
            return response()->json(['message' => 'No autorizado.'], 403);
        }

        // 🔽 Obtener también los avisos de la clase
        $notices = $classroom->notices()->orderBy('created_at', 'desc')->get();

        return response()->json([
            'classroom' => $classroom,
            'students' => $classroom->students,
            'notices' => $notices
        ]);
    }

    // ✅ Mostrar detalles de una clase para el alumno (sin restricción de maestro)
    public function showForStudent($id)
    {
        $classroom = Classroom::find($id);

        if (!$classroom) {
            return response()->json(['message' => 'Clase no encontrada.'], 404);
        }

        // Verificar si el alumno está inscrito
        $user = auth()->user();
        if ($user->role !== 'student' || !$classroom->students->contains($user->id)) {
            return response()->json(['message' => 'No autorizado.'], 403);
        }

        return response()->json(['classroom' => $classroom]);
    }
}
