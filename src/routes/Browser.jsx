import React, * as react from "react";

import * as classes from "../styles/browser.module.scss";

export default function Browser() {
  return (
    <main className={classes.main}>
      <form className={classes.browser}>
        <h1 className={classes.header}>Wyszukaj przejazd już teraz!</h1>
        <input className={classes.input} type="text" placeholder="Skąd" />
        <input className={classes.input} type="text" placeholder="Dokąd" />
        <input
          className={classes.input}
          type="text"
          placeholder="Data i czas wyjazdu"
        />
        <button type="submit" className={classes.button}>
          Szukaj
        </button>
      </form>
    </main>
  );
}
