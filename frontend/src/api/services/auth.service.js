import httpCommon from "src/api/http-common.js";
import { handleResponse } from "src/utils/helpers/actions.js";

const register = (formdata) => {
  return handleResponse(httpCommon.post("/auth/register", formdata));
};

const login = (email, password) => {
  return httpCommon
    .post("/auth/login", {
      email,
      password,
    })
    .then((response) => {
      // Handle the response data here
      return handleResponse(response);
    })
    .catch((error) => {
      console.error("Axios Error:", error);
      // Handle the error here (e.g., show an error message to the user)
      throw error; // Rethrow the error to propagate it further if needed
    });
};

const AuthService = {
  register,
  login,
};

export default AuthService;
