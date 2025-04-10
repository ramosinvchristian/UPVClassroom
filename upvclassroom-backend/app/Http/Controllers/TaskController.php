<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Topic;
use App\Models\Notice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function store(Request $request, $topic_id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
            'topic_id' => 'required|exists:topics,id',
    ]);

        $topic = Topic::findOrFail($topic_id);

        // Crear la tarea asociada al tema
        $task = $topic->tasks()->create([
            'name' => $request->name,
            'description' => $request->description,
            'due_date' => $request->due_date,
        ]);

        // Crear un aviso automático con mensaje personalizado
        $teacherName = Auth::user()->name ?? 'El profesor';
        $message = "📢 $teacherName ha publicado una nueva tarea: **{$request->name}**";

        Notice::create([
            'classroom_id' => $topic->classroom_id,
            'title' => 'Nueva tarea publicada',
            'content' => $message,
            'user_id' => Auth::id(),
            'attachment' => null,
        ]);

        return response()->json([
            'message' => 'Tarea y aviso registrados correctamente',
            'task' => $task
        ], 201);
    }

    public function index($classroomId)
    {
        $tasks = Task::with('topic')
            ->whereHas('topic', function ($query) use ($classroomId) {
                $query->where('classroom_id', $classroomId);
            })->get();

        return response()->json($tasks);
    }
}
