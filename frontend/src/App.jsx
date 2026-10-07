import { Routes, Route } from "react-router-dom";
import AppointmentList from "./components/AppointmentList";
import AppointmentForm from "./components/AppointmentForm";

function App() {
  return (
    <Routes>
      {/* Table page */}
      <Route path="/" element={<AppointmentList />} />
      {/* Add page */}
      <Route path="/appointments/new" element={<AppointmentForm />} />
      {/* NEW: Edit page (uses the SAME form). :id = the appointment number */}
      <Route path="/appointments/:id/edit" element={<AppointmentForm />} />
    </Routes>
  );
}

export default App;
