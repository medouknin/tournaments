<?php
// app/Models/Team.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['name', 'captain_id', 'tournament_id'];

    public function tournament()
    {
        return $this->belongsTo(Tournament::class);
    }

    public function players()
    {
        return $this->hasMany(Player::class);
    }
}
