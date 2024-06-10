<?php

// database/seeders/DatabaseSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            TournamentSeeder::class,
            TeamSeeder::class,
            PlayerSeeder::class,
            StadeSeeder::class,
            GameSeeder::class,
            RankingSeeder::class,
        ]);
    }
}
