<?php

namespace App\Http\Controllers;

use App\Models\Topic;
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
            'name' => $validated['title'], // ✅ Usar 'name' como en tu tabla
            'description' => $validated['description'] ?? null, // ⚠️ Este campo no existe aún
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
}
