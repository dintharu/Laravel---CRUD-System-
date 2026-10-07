<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    // The columns we are allowed to fill in from the form
    protected $fillable = [
        'patient_name',
        'nic',
        'phone',
        'doctor_id',
        'appointment_date',
        'appointment_time',
        'reason',
    ];

    // Each appointment belongs to one doctor
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
}


