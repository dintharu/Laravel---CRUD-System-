import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(function () {
    loadAppointments();
  }, []);

  // Ask Laravel for all appointments
  async function loadAppointments() {
    const response = await api.get("/appointments");
    setAppointments(response.data);
  }

  // NEW: runs when a Delete button is clicked
  async function handleDelete(id) {
    // Show a popup with OK / Cancel. "sure" becomes true (OK) or false (Cancel).
    const sure = window.confirm("Do you want to delete this appointment?");

    // If the user clicked Cancel, stop here
    if (sure === false) {
      return;
    }

    // Tell Laravel to delete it: DELETE /api/appointments/5
    await api.delete("/appointments/" + id);

    // Reload the table so the deleted row disappears
    loadAppointments();
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Appointment List</h2>
        <Link to="/appointments/new" className="btn btn-primary">
          + Make an Appointment
        </Link>
      </div>

      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>NIC</th>
            <th>Phone</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments.length === 0 && (
            <tr>
              <td colSpan="9" className="text-center text-muted">
                No appointments yet
              </td>
            </tr>
          )}

          {appointments.map(function (appointment) {
            return (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.patient_name}</td>
                <td>{appointment.nic}</td>
                <td>{appointment.phone}</td>
                <td>{appointment.doctor.name}</td>
                <td>{appointment.appointment_date}</td>
                <td>{appointment.appointment_time}</td>
                <td>{appointment.reason}</td>

                {/* NEW: Actions column */}
                <td className="text-center">
                  {/* Update button: goes to /appointments/5/edit */}
                  <Link
                    to={"/appointments/" + appointment.id + "/edit"}
                    className="btn btn-sm btn-warning me-2"
                    title="Update"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Link>

                  {/* Delete button: runs handleDelete with this appointment's id */}
                  <button
                    className="btn btn-sm btn-danger"
                    title="Delete"
                    onClick={function () {
                      handleDelete(appointment.id);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;
