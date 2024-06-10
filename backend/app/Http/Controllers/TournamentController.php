<?php

namespace App\Http\Controllers;

use App\Models\Tournament;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TournamentController extends Controller
{
    public function index()
    {
        $tournaments = Tournament::all();
        return response()->json($tournaments);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'type' => 'required|in:Football,Basketball,Tennis',
            'teams' => 'required|integer|in:4,8,16,32',
            'players' => 'required|integer|in:1,2,5,8',
            'fees' => 'required|numeric',
        ]);

        $imagePath = $request->file('photo')->store('public/tournament_photos');
        $imageUrl = "http://127.0.0.1:8000".Storage::url($imagePath);

        $tournament = new Tournament();
        $tournament->title = $validatedData['title'];
        $tournament->description = $validatedData['description'];
        $tournament->photo = $imageUrl;
        $tournament->type = $validatedData['type'];
        $tournament->teams = $validatedData['teams'];
        $tournament->players = $validatedData['players'];
        $tournament->fees = $validatedData['fees'];
        $tournament->save();

        return response()->json([
            'message' => 'Tournament created successfully',
            'tournament' => $tournament,
        ], 201);
    }
}
