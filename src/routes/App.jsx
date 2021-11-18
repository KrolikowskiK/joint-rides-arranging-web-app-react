import * as React from "react";
import { Outlet } from "react-router-dom";

import { Context } from "../Context";

import Navbar from "../components/Navbar";
import AuthNavbar from "../components/AuthNavbar";

import * as css from "../styles/app.module.scss";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.authenticate = () => {
      this.setState({
        isAuthenticated: true,
      });
    };

    this.signout = () => {
      this.setState({
        isAuthenticated: false,
      });
    };

    this.state = {
      isAuthenticated: false,
      authenticate: this.authenticate,
      signout: this.signout,
    };
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.state.isAuthenticated ? <AuthNavbar /> : <Navbar />}
        <main className={css.main}>
          <Outlet />
        </main>
      </Context.Provider>
    );
  }
}
