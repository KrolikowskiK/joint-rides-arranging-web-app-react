import React from "react";
import useAuth from "../components/Auth";
import { useNavigate } from "react-router";
import * as css from "../styles/signOut.module.scss";

export default function SignOut() {
  const { signout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      signout();
      navigate("/");
    }, 2000);
    return () => {
      window.clearTimeout(id);
    };
  });

  return <h1 className={css.h}>Za chwilę zostaniesz wylogowany z serwisu</h1>;
}
