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

  // Runs when a Delete button is clicked
  async function handleDelete(id) {
    const sure = window.confirm("Do you want to delete this appointment?");

    if (sure === false) {
      return;
    }

    try {
      await api.delete("/appointments/" + id);
      loadAppointments();
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
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
            <th>Email</th>
            {/* NEW */}
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
              {/* NEW: was 9, now 10 columns */}
              <td colSpan="10" className="text-center text-muted">
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
                <td>{appointment.email}</td>
                {/* NEW */}
                <td>{appointment.phone}</td>
                <td>{appointment.doctor.name}</td>
                <td>{appointment.appointment_date}</td>
                <td>{appointment.appointment_time}</td>
                <td>{appointment.reason}</td>

                <td className="text-center text-nowrap">
                  <Link
                    to={"/appointments/" + appointment.id + "/edit"}
                    className="btn btn-sm btn-outline-primary me-2"
                    title="Edit"
                  >
                    <i className="bi bi-pencil-square me-1"></i>
                    Edit
                  </Link>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Delete"
                    onClick={function () {
                      handleDelete(appointment.id);
                    }}
                  >
                    <i className="bi bi-trash3 me-1"></i>
                    Delete
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
