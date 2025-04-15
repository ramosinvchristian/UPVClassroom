<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'classroom_id'];

    // Relación con la clase
    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }
}
