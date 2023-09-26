import cookie from "react-cookies";
export const setCookie = (name, value, options = { path: "/" }) => {
  cookie.save(name, value, options);
};

export const setCookieObject = (name, obj, options = { path: "/" }) => {
  cookie.save(name, JSON.stringify(obj), options);
};

export const setHeadersInCookies = (apiResponse) => {
  setCookie("access_token", apiResponse.access_token);
  // setCookieObject("user", apiResponse.user);
};

export const removeCookie = (name, options = { path: "/" }) => {
  cookie.remove(name, options);
};

export const getCookieObject = (name, type) => {
  const val = cookie.load(name);
  return val ? val : type === "array" ? [] : {};
};

export const getCookie = (name) => {
  const val = cookie.load(name);
  return val || "";
};

export const signOutUser = () => {
  removeCookie("access_token");
  removeCookie("user");
};

export const ValidateEmail = (mail) => {
  if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value)
  ) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
};
