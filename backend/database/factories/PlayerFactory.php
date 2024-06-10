<?php
// database/factories/PlayerFactory.php

namespace Database\Factories;

use App\Models\Player;
use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlayerFactory extends Factory
{
    protected $model = Player::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'team_id' => Team::factory(),
            'goals' => $this->faker->numberBetween(0, 20),
        ];
    }
}
