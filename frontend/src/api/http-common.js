import axios from "axios";
import { getCookie } from "src/utils/helpers/cookies.js";

export default axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json",
  },
});
