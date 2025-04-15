<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained('usuarios')->onDelete('cascade'); // alumno
            $table->string('file_path')->nullable();
            $table->boolean('is_submitted')->default(false); // false = borrador, true = entregado
            $table->integer('grade')->nullable(); // Calificación (asignada por el maestro)
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task_submissions');
    }
};
