<?php

namespace App\Http\Controllers;

use App\Models\Notice;
use App\Models\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NoticeController extends Controller
{
    // 🔽 Obtener avisos de una clase
    public function index($classroom_id)
    {
        $notices = Notice::where('classroom_id', $classroom_id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notices);
    }

    // ➕ Crear un nuevo aviso
    public function store(Request $request, $classroom_id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string', // Usar 'content', no 'body'
            'attachment' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048'
        ]);

        $attachmentPath = null;

        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('attachments', 'public');
        }

        $notice = Notice::create([
            'classroom_id' => $classroom_id,
            'user_id' => auth()->id(), // ✅ Este es el fix clave
            'title' => $request->title,
            'content' => $request->content,
            'attachment' => $attachmentPath,
        ]);

        return response()->json([
            'message' => 'Aviso creado exitosamente.',
            'notice' => $notice
        ], 201);
    }
}
