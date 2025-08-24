import axios from "axios";
const baseRoute = "http://localhost:5000";
const baseRouteLive = "https://tiny-lion-train.cyclic.app"
const api = axios.create({
  baseURL: baseRoute,
});
export { api, baseRoute };
