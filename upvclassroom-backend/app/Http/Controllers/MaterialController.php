<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\Topic;
use App\Models\Notice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class MaterialController extends Controller
{
    public function store(Request $request, $topic_id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'nullable|file|max:10240', // máx 10MB
        ]);

        $topic = Topic::findOrFail($topic_id);

        $path = null;
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('materials', 'public');
        }

        $material = $topic->materials()->create([
            'title' => $request->title,
            'description' => $request->description,
            'file_path' => $path,
        ]);

        $teacherName = Auth::user()->name ?? 'El profesor';
        $content = "📘 $teacherName ha subido un nuevo material: **{$material->title}**";

        Notice::create([
            'classroom_id' => $topic->classroom_id,
            'title' => 'Nuevo material disponible',
            'content' => $content,
            'user_id' => Auth::id(),
            'attachment' => $path,
        ]);

        return response()->json(['message' => 'Material y aviso creados', 'material' => $material], 201);
    }

    public function index($classroomId)
    {
        $materials = Material::with('topic')
            ->whereHas('topic', function ($query) use ($classroomId) {
                $query->where('classroom_id', $classroomId);
            })->get();

        return response()->json($materials);
    }

    public function update(Request $request, $id)
    {
        $material = Material::findOrFail($id);
    
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
    
        $material->title = $request->title;
        $material->description = $request->description;
    
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('materials', 'public');
            $material->file_path = $filePath;
        }
    
        $material->save();
    
        return response()->json(['message' => 'Material actualizado correctamente', 'material' => $material]);
    }
    
    public function destroy($id)
    {
        $material = Material::findOrFail($id);
    
        if ($material->file_path && \Storage::disk('public')->exists($material->file_path)) {
            \Storage::disk('public')->delete($material->file_path);
        }
    
        $material->delete();
    
        return response()->json(['message' => 'Material eliminado correctamente']);
    }
    
}
