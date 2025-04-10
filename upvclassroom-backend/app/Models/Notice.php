<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'content', 
    'classroom_id', 'user_id', 'attachment'];

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }
}
