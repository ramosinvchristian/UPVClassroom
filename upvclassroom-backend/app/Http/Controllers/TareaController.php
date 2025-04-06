<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tarea; // Asegúrate de importar el modelo Tarea

class TareaController extends Controller
{
    public function store(Request $request)
    {
        // Validar los datos del formulario
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'fecha_entrega' => 'required|date',
        ]);

        // Crear la tarea
        $tarea = Tarea::create([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'fecha_entrega' => $request->fecha_entrega,
        ]);

        // Retornar la tarea creada
        return response()->json($tarea, 201);
    }
}
