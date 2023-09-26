// context/AuthContext.js
import { createContext, useContext, useState } from "react";
import httpCommon from "src/api/http-common.js";
import {
  getCookie,
  getCookieObject,
  setCookieObject,
  setHeadersInCookies,
  signOutUser,
} from "src/utils/helpers/cookies.js";
import AuthService from "src/api/services/auth.service.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCookieObject("user"));

  const login = (email, password) => {
    AuthService.login(email, password).then((res) => {
      const user = res.user;
      setUser(user);
      httpCommon.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.access_token}`;
      setHeadersInCookies(res);
      setCookieObject("user", user);
    });
  };

  const logout = () => {
    // Logic to clear user data on logout
    setUser(null);
    signOutUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
