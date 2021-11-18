import * as React from "react";

import { Context } from "../Context";

import * as css from "../styles/signIn.module.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = (event) => {
      alert("Form submitted");
      this.context.authenticate();
      event.preventDefault();
    };
  }

  render() {
    return (
      <form className={css.signin}>
        <h1 className={css.header}>Logowanie</h1>
        <input className={css.input} type="text" placeholder="E-mail" />
        <input className={css.input} type="text" placeholder="Hasło" />
        <button
          type="submit"
          className={css.button}
          onClick={this.handleSubmit}
        >
          Zaloguj się
        </button>
      </form>
    );
  }
}

SignIn.contextType = Context;

export default SignIn;
