<?php

namespace App\Http\Controllers;

use App\Models\Tournament;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function gamesByTournament(Request $request, $tournamentId)
    {
        $tournament = Tournament::findOrFail($tournamentId);

        // Eager load the relationships to avoid N+1 queries
        $games = $tournament->games()->with('homeTeam', 'awayTeam')->get();

        // Transform the games data to include the teams' information
        $transformedGames = $games->map(function ($game) {
            return [
                'id' => $game->id,
                'date' => $game->date,
                'home_goals' => $game->home_goals,
                'away_goals' => $game->away_goals,
                'home_team' => [
                    'id' => $game->homeTeam->id,
                    'name' => $game->homeTeam->name,
                ],
                'away_team' => [
                    'id' => $game->awayTeam->id,
                    'name' => $game->awayTeam->name,
                ],
            ];
        });

        return response()->json([
            'tournament' => $tournament,
            'games' => $transformedGames,
        ]);
    }
}
