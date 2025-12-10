import axios from "axios";

const api = axios.create({
  // baseURL: "http://72.61.238.120:4000/api/v1", // change if needed
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true, // send cookies for refresh token
});

export default api;
