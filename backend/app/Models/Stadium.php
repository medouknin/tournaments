<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stadium extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'location', 'capacity'
    ];

    public function games()
    {
        return $this->hasMany(Game::class);
    }
}
