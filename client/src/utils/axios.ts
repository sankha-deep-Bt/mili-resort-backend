import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1", // change if needed
  withCredentials: true, // send cookies for refresh token
});

export default api;
