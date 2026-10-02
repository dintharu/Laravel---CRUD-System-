import { Link } from "react-router-dom";

function AppointmentForm() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Book an Appointment</h2>

      <form>
        {/* Patient Name: was "Email address" */}
        <div className="mb-3">
          <label htmlFor="patientName" className="form-label">
            Patient Name
          </label>
          <input
            type="text"
            className="form-control"
            id="patientName"
            placeholder="Enter patient name"
          />
        </div>

        {/* NIC: was "Password" */}
        <div className="mb-3">
          <label htmlFor="nic" className="form-label">
            NIC
          </label>
          <input
            type="text"
            className="form-control"
            id="nic"
            placeholder="e.g. 200012345678"
          />
        </div>

        {/* Phone: copied block, type="tel" for phone numbers */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="07X XXX XXXX"
          />
        </div>

        {/* Doctor Name: dropdown from Bootstrap's "Select" page */}
        <div className="mb-3">
          <label htmlFor="doctor" className="form-label">
            Doctor Name
          </label>
          <select className="form-select" id="doctor">
            <option value="">Select a doctor</option>
            <option value="Dr. Perera">Dr. Perera</option>
            <option value="Dr. Silva">Dr. Silva</option>
            <option value="Dr. Fernando">Dr. Fernando</option>
          </select>
        </div>

        {/* Appointment Date: type="date" shows a calendar picker */}
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Appointment Date
          </label>
          <input type="date" className="form-control" id="date" />
        </div>

        {/* Appointment Time: dropdown of time slots to select */}
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Appointment Time
          </label>
          <select className="form-select" id="time">
            <option value="">Select a time</option>
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
          </select>
        </div>

        {/* Reason: textarea from Bootstrap's "Form controls" page */}
        <div className="mb-3">
          <label htmlFor="reason" className="form-label">
            Reason
          </label>
          <textarea
            className="form-control"
            id="reason"
            rows="3"
            placeholder="Reason for the visit"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        {/* Goes back to the table page. btn-secondary = grey, ms-2 = small space on the left */}
        <Link to="/" className="btn btn-secondary ms-2">
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default AppointmentForm;
