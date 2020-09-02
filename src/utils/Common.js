export const getUser = () => {
  const userStr = sessionStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

export const getToken = () => {
  return (
    sessionStorage.getItem("token") || localStorage.getItem("token") || null
  );
};

export const removeUserSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const setUserSession = (token, user) => {
  setUser(user);
  setToken(token);
};

export const setUser = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const setToken = (token) => {
  sessionStorage.setItem("token", token);
  localStorage.setItem("token", token);
};
