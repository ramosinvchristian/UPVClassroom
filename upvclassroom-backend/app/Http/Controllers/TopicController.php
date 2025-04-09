<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Models\Classroom;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    public function store(Request $request, $classroom_id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $classroom = Classroom::findOrFail($classroom_id);

        $topic = $classroom->topics()->create([
            'name' => $request->name,
        ]);

        return response()->json($topic, 201);
    }
}
