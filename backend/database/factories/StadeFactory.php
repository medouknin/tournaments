<?php
// database/factories/StadeFactory.php

namespace Database\Factories;

use App\Models\Stade;
use Illuminate\Database\Eloquent\Factories\Factory;

class StadeFactory extends Factory
{
    protected $model = Stade::class;

    public function definition()
    {
        return [
            'name' => $this->faker->company . ' Stadium',
            'capacity' => $this->faker->numberBetween(1000, 50000),
            'location' => $this->faker->city,
        ];
    }
}
