import React from "react";
import * as css from "../styles/friendsSearchForm.module.scss";

export default function FriendsSearchForm() {
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <div className={css.searchForm}>
      <h1 className={css.header}>Wyszukaj znajomych</h1>
      <form className={css.form}>
        <input
          className={css.input}
          type="text"
          placeholder="Imię i nazwisko"
        />
        <button type="submit" className={css.button} onClick={handleSubmit}>
          Szukaj
        </button>
      </form>
    </div>
  );
}
