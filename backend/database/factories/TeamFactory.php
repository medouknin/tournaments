<?php
// database/factories/TeamFactory.php

namespace Database\Factories;

use App\Models\Team;
use App\Models\User;
use App\Models\Tournament;
use Illuminate\Database\Eloquent\Factories\Factory;

class TeamFactory extends Factory
{
    protected $model = Team::class;

    public function definition()
    {
        return [
            'name' => $this->faker->company,
            'captain_id' => User::factory(),
            'tournament_id' => Tournament::factory(),
        ];
    }
}
