<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Topic;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function store(Request $request, $topic_id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
        ]);

        $topic = Topic::findOrFail($topic_id);

        $task = $topic->tasks()->create([
            'name' => $request->name,
            'description' => $request->description,
            'due_date' => $request->due_date,
        ]);

        return response()->json($task, 201);
    }
}
