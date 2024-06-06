<?php
namespace Database\Factories;

use App\Models\Tournament;
use Illuminate\Database\Eloquent\Factories\Factory;

class TournamentFactory extends Factory
{
    protected $model = Tournament::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'tournamentType' => $this->faker->randomElement(['basketball', 'football', 'tennis']),
        ];
    }
}
