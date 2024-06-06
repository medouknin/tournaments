<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Stadium;

class StadiumSeeder extends Seeder
{
    public function run()
    {
        Stadium::factory()->count(5)->create();
    }
}

