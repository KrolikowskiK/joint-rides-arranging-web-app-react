import React from "react";
import { UserContext } from "./App";
import { useNavigate } from "react-router";
import * as css from "../styles/signOut.module.scss";

export default function SignOut() {
  const context = React.useContext(UserContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      context.dispatch({ type: "LOGOUT" });
      navigate("/");
    }, 2000);
    return () => {
      window.clearTimeout(id);
    };
  }, [context.isAuthenticated]);

  return (
    <>
      <h1 className={css.h}>Za chwilę zostaniesz wylogowany z serwisu</h1>
    </>
  );
}
