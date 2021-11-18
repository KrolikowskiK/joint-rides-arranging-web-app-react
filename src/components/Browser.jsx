import * as React from "react";

import * as css from "../styles/browser.module.scss";

export default function Browser() {
  return (
    <form className={css.browser}>
      <h1 className={css.header}>Wyszukaj przejazd już teraz!</h1>
      <input className={css.input} type="text" placeholder="Skąd" />
      <input className={css.input} type="text" placeholder="Dokąd" />
      <input
        className={css.input}
        type="text"
        placeholder="Data i czas wyjazdu"
      />
      <button type="submit" className={css.button}>
        Szukaj
      </button>
    </form>
  );
}
