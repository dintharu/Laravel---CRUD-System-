<?php

namespace App\Http\Controllers;

use App\Models\Doctor;

class DoctorController extends Controller
{
    // function  gives back the list of all doctors
    public function index()
    {
        // Get all rows from the doctors table
        $doctors = Doctor::all();

        // Send the doctors back (Laravel turns them into JSON)
        return $doctors;
    }
}