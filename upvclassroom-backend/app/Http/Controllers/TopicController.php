<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Models\Classroom;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    public function store(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
    
        $topic = Topic::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'classroom_id' => $id,
        ]);
    
        return response()->json(['message' => 'Tema creado correctamente', 'topic' => $topic], 201);
    }

    public function index($id)
    {
        $topics = \App\Models\Topic::where('classroom_id', $id)->get();
        return response()->json($topics);
    }

}
