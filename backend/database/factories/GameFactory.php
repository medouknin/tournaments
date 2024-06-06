<?php
namespace Database\Factories;

use App\Models\Game;
use App\Models\Team;
use App\Models\Stadium;
use App\Models\Tournament;
use Illuminate\Database\Eloquent\Factories\Factory;

class GameFactory extends Factory
{
    protected $model = Game::class;

    public function definition()
    {
        return [
            'home_team_id' => Team::factory()->create()->id,
            'away_team_id' => Team::factory()->create()->id,
            'stadium_id' => Stadium::factory()->create()->id,
            'tournament_id' => Tournament::factory()->create()->id,
            'date' => $this->faker->dateTimeBetween('now', '+1 year'),
        ];
    }
}
