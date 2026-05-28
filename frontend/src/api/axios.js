import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-interview-backend.onrender.com/api",
});

export default API;