<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    use HasFactory;

    protected $fillable = [
        'classroom_id',
        'title',
        'content',  // ← usamos "content" en lugar de "body"
        'attachment',
    ];

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }
}
