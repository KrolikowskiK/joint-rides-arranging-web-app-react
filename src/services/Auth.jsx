import React, { useState, createContext } from "react";
import jwt_decode from "jwt-decode";

const authContext = createContext();

const checkToken = () => {
  try {
    const token = localStorage.getItem("token");
    const { userId } = jwt_decode(token);
    return { token: token, userId: userId };
  } catch (error) {
    return {};
  }
};

const useAuth = () => {
  let credentials = checkToken();
  const [token, setToken] = useState(credentials.token);
  const [userId, setUserId] = useState(credentials.userId);

  return {
    token,
    userId,
    signin(data) {
      return new Promise((res) => {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        res();
      });
    },
    signout() {
      return new Promise((res) => {
        localStorage.removeItem("token");
        setToken(null);
        res();
      });
    },
  };
};

const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const authConsumer = () => {
  return React.useContext(authContext);
};

export { AuthProvider };
export default authConsumer;
