<?php

namespace Database\Factories;

use App\Models\Stadium;
use Illuminate\Database\Eloquent\Factories\Factory;

class StadiumFactory extends Factory
{
    protected $model = Stadium::class;

    public function definition()
    {
        return [
            'name' => $this->faker->company,
            'location' => $this->faker->city,
            'capacity' => $this->faker->numberBetween(1000, 50000),
        ];
    }
}
