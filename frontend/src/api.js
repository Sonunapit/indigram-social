import axios from "axios";

// Cookie (JWT) automatically bheji jayegi
export const api = axios.create({
  baseURL: "https://backend12-teal.vercel.app/",
  withCredentials: true,
});
