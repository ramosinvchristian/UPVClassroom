<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Classroom extends Model
{
    use HasFactory;

    protected $table = 'classes'; 

    protected $fillable = [
        'name',
        'description',
        'group_code',
        'career',
        'cuatrimestre',
        'teacher_id'
    ];

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
