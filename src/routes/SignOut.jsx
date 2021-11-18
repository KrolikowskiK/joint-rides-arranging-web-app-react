import * as React from "react";

import * as css from "../styles/signOut.module.scss";

export default function SignOut() {
  return (
    <>
      <h1 className={css.h}>Wylogowano</h1>
      <h2 className={css.h}>
        Za chwilę zostaniesz przeniesiony na stronę główną
      </h2>
    </>
  );
}
