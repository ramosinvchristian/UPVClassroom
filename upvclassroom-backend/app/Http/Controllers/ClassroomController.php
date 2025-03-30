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
}
