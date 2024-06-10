<?php
// database/factories/RankingFactory.php

namespace Database\Factories;

use App\Models\Ranking;
use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Database\Eloquent\Factories\Factory;

class RankingFactory extends Factory
{
    protected $model = Ranking::class;

    public function definition()
    {
        return [
            'team_id' => Team::factory(),
            'tournament_id' => Tournament::factory(),
            'points' => $this->faker->numberBetween(0, 50),
            'rank' => $this->faker->unique()->numberBetween(1, 10),
        ];
    }
}
