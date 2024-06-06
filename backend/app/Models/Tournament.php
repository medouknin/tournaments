<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'tournamentType'
    ];

    public function games()
    {
        return $this->hasMany(Game::class);
    }

    public function rankings()
    {
        return $this->hasMany(Ranking::class);
    }
}
