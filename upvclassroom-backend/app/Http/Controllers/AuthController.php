<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
{
    \Log::info('Intentando login con:', [
        'email' => $request->email,
        'password' => $request->password,
    ]);

    $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        \Log::warning('Usuario no encontrado.');
    } elseif (!Hash::check($request->password, $user->password)) {
        \Log::warning('Contraseña incorrecta.', [
            'password_ingresada' => $request->password,
            'password_en_bd' => $user->password,
        ]);
    }

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['Las credenciales son incorrectas.'],
        ]);
    }

    \Log::info('Login exitoso para usuario:', ['id' => $user->id]);

    return response()->json([
        'token' => $user->createToken('token')->plainTextToken,
        'user' => $user
    ]);
}

}
