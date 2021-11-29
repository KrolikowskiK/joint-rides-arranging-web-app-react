import * as React from "react";

const authContext = React.createContext();

const checkToken = () => {
  if (localStorage.getItem("token") !== null) return true;
  return false;
};

function useAuth() {
  const [authed, setAuthed] = React.useState(checkToken());

  return {
    authed,
    signin() {
      return new Promise((res) => {
        localStorage.setItem("token", "1234");
        setAuthed(true);
        res();
      });
    },
    signout() {
      return new Promise((res) => {
        localStorage.removeItem("token");
        setAuthed(false);
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
