<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ranking;

class RankingSeeder extends Seeder
{
    public function run()
    {
        Ranking::factory()->count(30)->create();
    }
}

