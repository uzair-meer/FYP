import httpCommon from "src/api/http-common.js";
import { handleResponse } from "src/utils/helpers/actions.js";

const register = (username, email, password) => {
  return handleResponse(
    httpCommon.post("/auth/signup", {
      username,
      email,
      password,
    }),
  );
};

const login = (username, password) => {
  return handleResponse(
    httpCommon.post("/auth/sign-in", {
      username,
      password,
    }),
  );
};

const AuthService = {
  register,
  login,
};

export default AuthService;
