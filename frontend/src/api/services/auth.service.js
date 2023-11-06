import httpCommon from "src/api/http-common.js";
import { handleResponse } from "src/utils/helpers/actions.js";

const register = (formdata) => {
  return handleResponse(httpCommon.post("/auth/register", formdata));
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
  register,
  login,
};

export default AuthService;
