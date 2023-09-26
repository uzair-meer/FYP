import httpCommon from "src/api/http-common.js";
import { handleResponse } from "src/utils/helpers/actions.js";

const getUsers = () => {
  return handleResponse(httpCommon.get("/users"));
};

const UserService = {
  getUsers,
};

export default UserService;
