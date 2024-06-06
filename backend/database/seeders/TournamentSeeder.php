<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tournament;

class TournamentSeeder extends Seeder
{
    public function run()
    {
        Tournament::factory()->count(3)->create();
    }
}

