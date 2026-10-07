// Bring in axios (the tool that sends requests to Laravel)
import axios from "axios";

// Create our own axios that always starts with Laravel's API address
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Let other files use it
export default api;
