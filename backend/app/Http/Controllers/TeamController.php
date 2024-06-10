<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::all();
        return response()->json($teams);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'teamName' => 'required',
            'captainId' => 'required',
            'tournamentId' => 'required',
        ]);

        $team = new Team();
        $team->name = $validatedData['teamName'];
        $team->captain_id = $validatedData['captainId'];
        $team->tournament_id = $validatedData['tournamentId'];
        $team->save();

        if (is_array($request->playerNames) && count($request->playerNames) > 0) {
            $players = [];
            foreach ($request->playerNames as $playerName) {
                $player = new Player();
                $player->name = $playerName;
                $player->team_id = $team->id;
                $player->save();
                $players[] = $player;
            }
        } else {
            return response()->json(['error' => 'Player names must be provided as an array'], 400);
        }

        return response()->json([
            'message' => 'Team and players created successfully',
            'team' => $team,
            'players' => $players,
        ], 201);
    }

    public function myTeam($captainId)
    {
        $team = Team::with(['players', 'games', 'tournament'])
            ->where('captain_id', $captainId)
            ->first();

        if (!$team) {
            return response()->json(['error' => 'Team not found'], 404);
        }

        return response()->json([
            'team' => $team,
            'players' => $team->players,
            'games' => $team->games,
            'tournament' => $team->tournament,
        ]);
    }

}
