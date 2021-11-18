import React from "react";
import { UserContext } from "./App";
import * as css from "../styles/signIn.module.scss";
import { useNavigate } from "react-router";

export default function SignIn() {
  const context = React.useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    context.dispatch({ type: "LOGIN" });
    navigate("/");
  }

  return (
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
