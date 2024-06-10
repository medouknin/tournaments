<?php

namespace Database\Seeders;

use App\Models\Stade;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Stade::factory()->count(10)->create();
    }
}
