<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\Topic;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    public function store(Request $request, $topic_id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,docx,pptx',
        ]);

        $topic = Topic::findOrFail($topic_id);

        $path = $request->file('file')->store('materials');

        $material = $topic->materials()->create([
            'name' => $request->name,
            'file_path' => $path,
        ]);

        return response()->json($material, 201);
    }
}
