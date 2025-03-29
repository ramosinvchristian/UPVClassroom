<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClassroomController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'group_code' => 'required|unique:classrooms',
            'career' => 'required|string',
            'semester' => 'required|string',
        ]);

        $classroom = Classroom::create([
            'name' => $request->name,
            'description' => $request->description,
            'group_code' => $request->group_code,
            'career' => $request->career,
            'semester' => $request->semester,
            'teacher_id' => Auth::id(),
        ]);

        return response()->json($classroom, 201);
    }
}
