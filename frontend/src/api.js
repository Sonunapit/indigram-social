import axios from "axios";

// Cookie (JWT) automatically bheji jayegi
export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
