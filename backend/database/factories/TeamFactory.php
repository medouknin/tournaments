<?php
namespace Database\Factories;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TeamFactory extends Factory
{
    protected $model = Team::class;

    public function definition()
    {
        return [
            'name' => $this->faker->company,
            'playersNumber' => $this->faker->numberBetween(5, 20),
            'captain_id' => User::factory()->create()->id,
        ];
    }
}
