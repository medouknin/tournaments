<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TournamentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::get('/me/user', [AuthController::class, 'me']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
});

Route::prefix('/tournaments')->group(function () {
    Route::get('/', [TournamentController::class, 'index']);
    Route::post('/store', [TournamentController::class, 'store']);
    Route::get('/{id}/games', [GameController::class, 'gamesByTournament']);
});

Route::prefix('teams')->group(function () {
    Route::get('/', [TeamController::class, 'index']);
    Route::post('/store', [TeamController::class, 'store']);
    Route::get('/my-team/{id}', [TeamController::class, 'myTeam']);
});
