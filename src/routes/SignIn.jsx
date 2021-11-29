import React from "react";
import useAuth from "../components/Auth";
import { useLocation, useNavigate } from "react-router";
import * as css from "../styles/signIn.module.scss";

export default function SignIn() {
  const navigate = useNavigate();
  const { signin, authed } = useAuth();
  const { state } = useLocation();

  function handleSubmit(event) {
    event.preventDefault();
    signin().then(() => {
      const path = state === null ? "/" : state.path;
      navigate(path);
    });
  }

  return authed ? (
    <h2 className={css.h2}>Już jesteś zalogowany</h2>
  ) : (
    <form className={css.signin}>
      <h1 className={css.header}>Logowanie</h1>
      <input className={css.input} type="text" placeholder="E-mail" />
      <input className={css.input} type="text" placeholder="Hasło" />
      <button type="submit" className={css.button} onClick={handleSubmit}>
        Zaloguj się
      </button>
    </form>
  );
}
