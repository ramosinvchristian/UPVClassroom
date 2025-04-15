<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TemaController extends Controller
{
    // app/Http/Controllers/TemaController.php
public function store(Request $request)
{
    $tema = Tema::create([
        'nombre' => $request->nombre
    ]);

    return response()->json($tema, 201);
}

}
