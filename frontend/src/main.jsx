import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// BrowserRouter makes page switching (Link, Routes) work
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* wrap App so every page can use Link and Routes */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
