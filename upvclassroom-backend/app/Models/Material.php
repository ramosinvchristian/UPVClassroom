<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $fillable = ['title', 'description', 'file_path', 'topic_id'];

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
}
