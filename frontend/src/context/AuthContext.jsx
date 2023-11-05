// context/AuthContext.js
import { createContext, useContext, useState } from "react";
import httpCommon from "src/api/http-common.js";
import {
  getCookieObject,
  setCookieObject,
  setHeadersInCookies,
  signOutUser,
} from "src/utils/helpers/cookies.js";
import AuthService from "src/api/services/auth.service.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCookieObject("user"));
  const login = async (email, password) => {
    await AuthService.login(email, password).then((res) => {
      setUser(res);
      setCookieObject("user", res);
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
