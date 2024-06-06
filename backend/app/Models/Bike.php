<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Bike extends Model
{
    use HasFactory;
    public function rentals()
    {
        return $this->hasMany(Rental::class);
    }
    // Optionnel: Si vous avez un modèle Maintenance
    public function maintenances()
    {
        return $this->hasMany(Maintenance::class);
    }
}
