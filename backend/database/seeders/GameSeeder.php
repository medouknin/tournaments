<?php

// database/seeders/GameSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Game;

class GameSeeder extends Seeder
{
    public function run()
    {
        Game::factory()->count(10)->create();
    }
}

