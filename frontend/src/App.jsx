// Routes = a group of pages, Route = one URL connected to one page
import { Routes, Route } from "react-router-dom";
import AppointmentList from "./components/AppointmentList";
import AppointmentForm from "./components/AppointmentForm";

function App() {
  return (
    <Routes>
      {/* "/" = home page → show the table */}
      <Route path="/" element={<AppointmentList />} />
      {/* "/appointments/new" → show the form */}
      <Route path="/appointments/new" element={<AppointmentForm />} />
    </Routes>
  );
}

export default App;
