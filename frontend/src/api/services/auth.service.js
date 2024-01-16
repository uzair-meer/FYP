import httpCommon from "src/api/http-common.js";
import { handleResponse } from "src/utils/helpers/actions.js";

const registerUser = (formdata) => {
  return handleResponse(httpCommon.post("/auth/register/user", formdata));
};

const login = (email, password) => {
  return handleResponse(
    httpCommon.post("/auth/login", {
      email,
      password,
    })
  );
};

const AuthService = {
  registerUser,
  // registerCompany,
  login,
};

export default AuthService;
