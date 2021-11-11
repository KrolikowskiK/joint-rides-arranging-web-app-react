import * as React from "react";
import * as classes from "../styles/signIn.module.scss";

export default function SignIn() {
  return (
    <main className={classes.main}>
      <form className={classes.signin}>
        <h1 className={classes.header}>Logowanie</h1>
        <input className={classes.input} type="text" placeholder="E-mail" />
        <input className={classes.input} type="text" placeholder="Hasło" />
        <button type="submit" className={classes.button}>
          Zaloguj się
        </button>
      </form>
    </main>
  );
}
