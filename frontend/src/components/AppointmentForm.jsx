import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function AppointmentForm() {
  const [patientName, setPatientName] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");

  const [doctors, setDoctors] = useState([]);

  const navigate = useNavigate();

  //read the `id from the URL.
  const params = useParams();
  const id = params.id;

  // decide the page title and button text
  let pageTitle = "Book an Appointment";
  let buttonText = "Submit";
  if (id) {
    pageTitle = "Edit Appointment";
    buttonText = "Update";
  }

  useEffect(function () {
    loadDoctors();

    //if we are editing, load that appointment into the form
    if (id) {
      loadAppointment();
    }
  }, []);

  async function loadDoctors() {
    const response = await api.get("/doctors");
    setDoctors(response.data);
  }

  //get one appointment from Laravel and fill every box
  async function loadAppointment() {
    const response = await api.get("/appointments/" + id);
    const appointment = response.data;

    setPatientName(appointment.patient_name);
    setNic(appointment.nic);

    // NEW: old appointments may have no email (null), so use "" instead
    if (appointment.email === null) {
      setEmail("");
    } else {
      setEmail(appointment.email);
    }

    setPhone(appointment.phone);
    setDoctorId(appointment.doctor_id);
    setAppointmentDate(appointment.appointment_date);

    // The database gives "09:00:00", but our dropdown uses "09:00".
    setAppointmentTime(appointment.appointment_time.substring(0, 5));

    // reason can be empty (null) in the database, so use "" instead
    if (appointment.reason === null) {
      setReason("");
    } else {
      setReason(appointment.reason);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // ==================== VALIDATION ====================

    // 1. Patient name must not be empty
    if (patientName.trim() === "") {
      alert("Please enter the patient name");
      return;
    }

    // 2. NIC must be 10 or 12 characters
    if (nic.length !== 10 && nic.length !== 12) {
      alert("Invalid NIC. It must be 10 or 12 characters");
      return;
    }

    // NEW 3. Email must not be empty
    if (email.trim() === "") {
      alert("Please enter the email address");
      return;
    }

    // NEW 4. Email must contain "@" and "."
    if (email.includes("@") === false || email.includes(".") === false) {
      alert("Invalid email address");
      return;
    }

    // 5. Phone must not be empty
    if (phone === "") {
      alert("Please enter the phone number");
      return;
    }

    // 6. Phone must contain only numbers
    if (isNaN(phone)) {
      alert("Invalid phone number. Use numbers only");
      return;
    }

    // 7. Phone must be exactly 10 digits
    if (phone.length !== 10) {
      alert("Invalid phone number. It must be 10 digits");
      return;
    }

    // 8. A doctor must be selected
    if (doctorId === "") {
      alert("Please select a doctor");
      return;
    }

    // 9. A date must be selected
    if (appointmentDate === "") {
      alert("Please select an appointment date");
      return;
    }

    // 10. The date must not be in the past
    const today = new Date().toISOString().substring(0, 10);
    if (appointmentDate < today) {
      alert("Appointment date cannot be in the past");
      return;
    }

    // 11. A time must be selected
    if (appointmentTime === "") {
      alert("Please select an appointment time");
      return;
    }

    // ====================================================

    const appointmentData = {
      patient_name: patientName,
      nic: nic,
      email: email, // NEW: send the email to Laravel
      phone: phone,
      doctor_id: doctorId,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      reason: reason,
    };

    try {
      if (id) {
        await api.put("/appointments/" + id, appointmentData);
        alert("Appointment updated successfully!");
      } else {
        await api.post("/appointments", appointmentData);
        alert("Appointment saved successfully!");
      }

      navigate("/");
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{pageTitle}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="patientName" className="form-label">
            Patient Name
          </label>
          <input
            type="text"
            className="form-control"
            id="patientName"
            placeholder="Enter patient name"
            value={patientName}
            onChange={function (e) {
              setPatientName(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="nic" className="form-label">
            NIC
          </label>
          <input
            type="text"
            className="form-control"
            id="nic"
            placeholder="e.g. 200012345678"
            value={nic}
            onChange={function (e) {
              setNic(e.target.value);
            }}
          />
        </div>

        {/*Email box */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="e.g. name@gmail.com"
            value={email}
            onChange={function (e) {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="07X XXX XXXX"
            value={phone}
            onChange={function (e) {
              setPhone(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="doctor" className="form-label">
            Doctor Name
          </label>
          <select
            className="form-select"
            id="doctor"
            value={doctorId}
            onChange={function (e) {
              setDoctorId(e.target.value);
            }}
          >
            <option value="">Select a doctor</option>
            {doctors.map(function (doctor) {
              return (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} ({doctor.specialization})
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Appointment Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={appointmentDate}
            onChange={function (e) {
              setAppointmentDate(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Appointment Time
          </label>
          <select
            className="form-select"
            id="time"
            value={appointmentTime}
            onChange={function (e) {
              setAppointmentTime(e.target.value);
            }}
          >
            <option value="">Select a time</option>
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="reason" className="form-label">
            Reason
          </label>
          <textarea
            className="form-control"
            id="reason"
            rows="3"
            placeholder="Reason for the visit"
            value={reason}
            onChange={function (e) {
              setReason(e.target.value);
            }}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          {buttonText}
        </button>
        <Link to="/" className="btn btn-secondary ms-2">
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default AppointmentForm;
