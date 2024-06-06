<?php
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
            'team_id' => Team::factory()->create()->id,
            'tournament_id' => Tournament::factory()->create()->id,
            'points' => $this->faker->numberBetween(0, 100),
            'wins' => $this->faker->numberBetween(0, 20),
            'losses' => $this->faker->numberBetween(0, 20),
            'rank' => $this->faker->numberBetween(1, 20),
        ];
    }
}
