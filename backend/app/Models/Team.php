<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'playersNumber', 'captain_id'
    ];

    public function players()
    {
        return $this->hasMany(Player::class);
    }

    public function captain()
    {
        return $this->belongsTo(User::class, 'captain_id');
    }

    public function rankings()
    {
        return $this->hasMany(Ranking::class);
    }

    public function games()
    {
        return $this->hasMany(Game::class);
    }
}
