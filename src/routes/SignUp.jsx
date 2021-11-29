import React from "react";
import useAuth from "../components/Auth";
import * as css from "../styles/signUp.module.scss";

export default function SignUp() {
  const { authed } = useAuth();

  return authed ? (
    <h2 className={css.h2}>Już jesteś zalogowany</h2>
  ) : (
    <form className={css.signup}>
      <h1 className={css.header}>Rejestracja</h1>
      <input className={css.input} type="text" placeholder="Imię" />
      <input className={css.input} type="text" placeholder="Nazwisko" />
      <input className={css.input} type="text" placeholder="E-mail" />
      <input className={css.input} type="text" placeholder="Hasło" />
      <input className={css.input} type="text" placeholder="Powtórz hasło" />
      <button type="submit" className={css.button}>
        Zarejestruj się
      </button>
    </form>
  );
}
