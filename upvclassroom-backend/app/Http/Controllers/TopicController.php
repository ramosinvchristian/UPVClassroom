<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Models\Classroom;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    // Crear un nuevo tema
    public function store(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $topic = Topic::create([
            'name' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'classroom_id' => $id,
        ]);

        return response()->json([
            'message' => 'Tema creado correctamente',
            'topic' => $topic
        ], 201);
    }

    // Listar temas de una clase
    public function index($id)
    {
        $topics = Topic::where('classroom_id', $id)->get();
        return response()->json($topics);
    }

    // Obtener temas con materiales y tareas (para el alumno)
    public function contenidoPorClase($classroomId)
    {
        $classroom = Classroom::findOrFail($classroomId);
        $temas = $classroom->topics()->with(['materials', 'tasks'])->get();
        return response()->json($temas);
    }
}
