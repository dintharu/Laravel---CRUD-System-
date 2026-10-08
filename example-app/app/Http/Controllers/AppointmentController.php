<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    // LIST ALL appointments (for the table)
    public function index()
    {
        $appointments = Appointment::with('doctor')->get();
        return $appointments;
    }

    // SAVE a new appointment
    public function store(Request $request)
    {
        $request->validate([
            'patient_name'     => 'required',
            'nic'              => 'required|max:12',
            'email'            => 'required|email',    
            'phone'            => 'required|max:15',
            'doctor_id'        => 'required|exists:doctors,id',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required',
        ]);

        $appointment = new Appointment();
        $appointment->patient_name     = $request->patient_name;
        $appointment->nic              = $request->nic;
        $appointment->email            = $request->email; 
        $appointment->phone            = $request->phone;
        $appointment->doctor_id        = $request->doctor_id;
        $appointment->appointment_date = $request->appointment_date;
        $appointment->appointment_time = $request->appointment_time;
        $appointment->reason           = $request->reason;
        $appointment->save();

        return $appointment;
    }

    // GET ONE appointment (to fill the Edit form)
    public function show(Appointment $appointment)
    {
        return $appointment;
    }

    // UPDATE an existing appointment
    public function update(Request $request, Appointment $appointment)
    {
        $request->validate([
            'patient_name'     => 'required',
            'nic'              => 'required|max:12',
            'email'            => 'required|email',              
            'phone'            => 'required|max:15',
            'doctor_id'        => 'required|exists:doctors,id',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required',
        ]);

        $appointment->patient_name     = $request->patient_name;
        $appointment->nic              = $request->nic;
        $appointment->email            = $request->email;
        $appointment->phone            = $request->phone;
        $appointment->doctor_id        = $request->doctor_id;
        $appointment->appointment_date = $request->appointment_date;
        $appointment->appointment_time = $request->appointment_time;
        $appointment->reason           = $request->reason;
        $appointment->save();

        return $appointment;
    }

    // DELETE an appointment
    public function destroy(Appointment $appointment)
    {
        $appointment->delete();

        return response()->json(['message' => 'Appointment deleted']);
    }
}