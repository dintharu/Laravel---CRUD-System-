<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    
// The columns we are allowed to fill in
    protected $fillable = [
        'name',
        'specialization',
    ];

    // A doctor can have many appointments
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
    

}
