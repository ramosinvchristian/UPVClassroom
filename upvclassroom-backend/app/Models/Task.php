<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['title', 'instructions', 'due_date', 'topic_id'];

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
}
