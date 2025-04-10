<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Notice;

class Classroom extends Model
{
    use HasFactory;

    // ✅ Asegúrate de que coincida con el nombre real en la base de datos
    protected $table = 'classrooms';

    protected $fillable = [
        'name',
        'description',
        'group_code',
        'career',
        'cuatrimestre',
        'teacher_id'
    ];

    // Relación con el maestro
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    // Relación con alumnos inscritos
    public function students()
    {
        return $this->belongsToMany(User::class, 'classroom_user', 'classroom_id', 'user_id');
    }

    public function notices()
    {
        return $this->hasMany(Notice::class);
    }

    public function topics()
    {
    return $this->hasMany(Topic::class);
    }
}
