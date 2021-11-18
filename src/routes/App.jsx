import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthNavbar from "../components/AuthNavbar";
import * as css from "../styles/app.module.scss";

export const UserContext = React.createContext();

const initialState = {
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {state.isAuthenticated ? <AuthNavbar /> : <Navbar />}
      <main className={css.main}>
        <Outlet />
      </main>
    </UserContext.Provider>
  );
}
