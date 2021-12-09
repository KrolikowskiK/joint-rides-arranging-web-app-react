import * as React from "react";
import jwt_decode from "jwt-decode";

const authContext = React.createContext();

const checkToken = () => {
  try {
    const token = localStorage.getItem("token");
    jwt_decode(token);
    return token;
  } catch (error) {
    return null;
  }
};

function useAuth() {
  const [token, setToken] = React.useState(checkToken());

  return {
    token,
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
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
