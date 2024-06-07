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
            'TourPhoto' => $this->faker->imageUrl(640, 480, 'sports', true, 'Faker'),
            'fees' => $this->faker->randomFloat(2, 10, 100),  
            'number_of_players' => $this->faker->numberBetween(1, 5)
        ];
    }
}
