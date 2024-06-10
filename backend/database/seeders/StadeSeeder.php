<?php

// database/seeders/StadeSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Stade;

class StadeSeeder extends Seeder
{
    public function run()
    {
        Stade::factory()->count(10)->create();
    }
}

