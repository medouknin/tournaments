<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;
    protected $fillable = [
        'home_team_id', 'away_team_id', 'stadium_id', 'tournament_id', 'date'
    ];

    public function homeTeam()
    {
        return $this->belongsTo(Team::class, 'home_team_id');
    }

    public function awayTeam()
    {
        return $this->belongsTo(Team::class, 'away_team_id');
    }

    public function stadium()
    {
        return $this->belongsTo(Stadium::class);
    }

    public function tournament()
    {
        return $this->belongsTo(Tournament::class);
    }
}
