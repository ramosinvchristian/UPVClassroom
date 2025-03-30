<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Esta tabla ya existe, no es necesario volver a crearla.
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Puedes descomentar si quieres permitir rollback manual
        // Schema::dropIfExists('personal_access_tokens');
    }
};
