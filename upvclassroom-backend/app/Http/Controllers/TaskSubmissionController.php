<?php

namespace App\Http\Controllers;

use App\Models\TaskSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskSubmissionController extends Controller
{
    /**
     * 📥 Alumno - Obtener todas sus entregas en una clase
     */
    public function index($classroomId)
    {
        $userId = Auth::id();

        $submissions = TaskSubmission::with('task')
            ->where('user_id', $userId)
            ->whereHas('task.topic', function ($query) use ($classroomId) {
                $query->where('classroom_id', $classroomId);
            })
            ->get();

        return response()->json($submissions);
    }

    /**
     * 💾 Alumno - Guardar borrador o confirmar entrega
     */
    public function store(Request $request, $taskId)
    {
        $validated = $request->validate([
            'file' => 'nullable|file',
            'is_submitted' => 'required|boolean',
        ]);

        $submission = TaskSubmission::firstOrNew([
            'task_id' => $taskId,
            'user_id' => Auth::id(),
        ]);

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('task_submissions');
            $submission->file_path = $path;
        }

        $submission->is_submitted = $validated['is_submitted'];
        $submission->save();

        return response()->json([
            'message' => 'Entrega guardada correctamente.',
            'submission' => $submission,
        ]);
    }

    /**
     * 📊 Maestro - Ver entregas de una tarea específica
     */
    public function showSubmissions($taskId)
    {
        $submissions = TaskSubmission::with('student')
            ->where('task_id', $taskId)
            ->get();

        return response()->json($submissions);
    }

    /**
     * 🧑‍🏫 Maestro - Calificar entrega
     */
    public function grade(Request $request, $submissionId)
    {
        $validated = $request->validate([
            'grade' => 'required|integer|min:0|max:100',
        ]);

        $submission = TaskSubmission::findOrFail($submissionId);
        $submission->grade = $validated['grade'];
        $submission->save();

        return response()->json([
            'message' => 'Calificación asignada correctamente.',
            'submission' => $submission,
        ]);
    }
}
