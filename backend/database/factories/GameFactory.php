<?php

namespace Database\Factories;

use App\Models\Stade;
use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Game>
 */
class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'home_team_id' => Team::factory(),
            'away_team_id' => Team::factory(),
            'stadium_id' => Stade::factory(),
            'tournament_id' => Tournament::factory(),
            'date' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            'home_goals' => $this->faker->numberBetween(0, 5),
            'away_goals' => $this->faker->numberBetween(0, 5),
        ];
    }
}
