<?php

// app/Models/Tournament.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    protected $fillable = ['title', 'description', 'photo', 'type', 'teams', 'players', 'fees'];

    public function teams()
    {
        return $this->hasMany(Team::class);
    }

    public function games()
    {
        return $this->hasMany(Game::class);
    }

    public function rankings()
    {
        return $this->hasMany(Ranking::class);
    }
}
