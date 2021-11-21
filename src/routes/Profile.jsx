import React from "react";
import * as css from "../styles/profile.module.scss";

export default function Profile() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  return (
    <>
      <h1 className={css.mainHeader}>Twój profil</h1>
      <form className={css.form}>
        <h2 className={css.secondaryHeader}>Zmień dane osobowe</h2>
        <input className={css.input} type="text" placeholder="Imię" />
        <input className={css.input} type="text" placeholder="Nazwisko" />
        <h2 className={css.secondaryHeader}>Zmień adres e-mail</h2>
        <input className={css.input} type="text" placeholder="E-mail" />
        <h2 className={css.secondaryHeader}>Zmień hasło</h2>
        <input className={css.input} type="text" placeholder="Stare hasło" />
        <input className={css.input} type="text" placeholder="Nowe hasło" />
        <input
          className={css.input}
          type="text"
          placeholder="Powtórz nowe hasło"
        />
        <button className={css.button} type="submit" onClick={handleFormSubmit}>
          Zapisz
        </button>
      </form>
    </>
  );
}
