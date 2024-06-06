<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tournament;

class TournamentController extends Controller
{
    public function index()
    {
        $tournaments = Tournament::all();
        return response()->json($tournaments);
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'tournamentType' => 'required|string|max:255',
            'TourPhoto' => 'nullable|string|max:255',
        ]);

        $tournament = Tournament::create($validated);

        return response()->json($tournament, 201);
    }

    
    public function destroy($id)
    {
        $tournament = Tournament::find($id);

        if (!$tournament) {
            return response()->json(['message' => 'Tournament not found'], 404);
        }

        $tournament->delete();

        return response()->json(['message' => 'Tournament deleted successfully'], 200);
    }
}
