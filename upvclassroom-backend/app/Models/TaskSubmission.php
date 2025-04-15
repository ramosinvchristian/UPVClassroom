<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'user_id',
        'file_path',
        'is_submitted',
        'grade'
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class); // Si el modelo se llama Usuario, usa App\Models\Usuario
    }

    // Relación con el alumno
    public function student()
    {
        return $this->belongsTo(\App\Models\User::class, 'user_id');
    }
}
