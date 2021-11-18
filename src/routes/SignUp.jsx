import * as React from "react";

import * as classes from "../styles/signUp.module.scss";

export default function SignUp() {
  return (
    <form className={classes.signup}>
      <h1 className={classes.header}>Rejestracja</h1>
      <input className={classes.input} type="text" placeholder="Imię" />
      <input className={classes.input} type="text" placeholder="Nazwisko" />
      <input className={classes.input} type="text" placeholder="E-mail" />
      <input className={classes.input} type="text" placeholder="Hasło" />
      <input
        className={classes.input}
        type="text"
        placeholder="Powtórz hasło"
      />
      <button type="submit" className={classes.button}>
        Zarejestruj się
      </button>
    </form>
  );
}
