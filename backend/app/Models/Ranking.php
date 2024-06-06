<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ranking extends Model
{
    use HasFactory;
    protected $fillable = [
        'team_id', 'tournament_id', 'points', 'wins', 'losses', 'rank'
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function tournament()
    {
        return $this->belongsTo(Tournament::class);
    }
}
