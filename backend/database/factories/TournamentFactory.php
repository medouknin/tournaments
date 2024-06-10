<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tournament>
 */
class TournamentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'photo' => $this->faker->imageUrl,
            'type' => $this->faker->randomElement(['football', 'basketball', 'tennis']),
            'teams' => $this->faker->numberBetween(4, 10),
            'players' => $this->faker->numberBetween(10, 20),
            'fees' => $this->faker->randomFloat(2, 10, 100),
        ];
    }
}
