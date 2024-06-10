<?php
// database/factories/TournamentFactory.php

namespace Database\Factories;

use App\Models\Tournament;
use Illuminate\Database\Eloquent\Factories\Factory;

class TournamentFactory extends Factory
{
    protected $model = Tournament::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'photo' => null,
            'type' => $this->faker->randomElement(['football', 'basketball', 'tennis']),
            'teams' => $this->faker->numberBetween(4, 10),
            'players' => $this->faker->numberBetween(10, 20),
            'fees' => $this->faker->randomFloat(2, 10, 100),
        ];
    }
}
