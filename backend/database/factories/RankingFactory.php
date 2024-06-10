<?php

namespace Database\Factories;

use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ranking>
 */
class RankingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'team_id' => Team::factory(),
            'tournament_id' => Tournament::factory(),
            'points' => $this->faker->numberBetween(0, 50),
            'rank' => $this->faker->unique()->numberBetween(1, 10),
        ];
    }
}
