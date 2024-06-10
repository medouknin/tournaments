<?php

namespace Database\Seeders;

use App\Models\Ranking;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RankingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ranking::factory()->count(10)->create();
    }
}
