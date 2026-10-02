// Link = a button/link that changes page WITHOUT reloading the browser
import { Link } from "react-router-dom";

function AppointmentList() {
  return (
    <div className="container mt-5">
      {/* d-flex = put items in one line
          justify-content-between = title on the left, button on the right
          align-items-center = line them up vertically in the middle */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Appointment List</h2>

        {/* to="/appointments/new" = which page to open when clicked
            btn btn-primary = blue Bootstrap button */}
        <Link to="/appointments/new" className="btn btn-primary">
          + Make an Appointment
        </Link>
      </div>

      {/* Table from Bootstrap's "Tables" page.
          table-bordered = borders, table-hover = row highlights when you hover */}
      <table className="table table-bordered table-hover">
        {/* thead = the header row. table-light = light grey background */}
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
          </tr>
        </thead>

        {/* tbody = the data rows. Empty for now; real data comes from Laravel later */}
        <tbody>
          <tr>
            {/* colSpan="9" = this one cell stretches across all 9 columns */}
            <td colSpan="9" className="text-center text-muted">
              No appointments yet
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;
