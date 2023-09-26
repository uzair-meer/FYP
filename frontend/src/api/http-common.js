import axios from "axios";
import { getCookie } from "src/utils/helpers/cookies.js";

export default axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    authorization: "Bearer " + getCookie("access_token") || null,
  },
});
