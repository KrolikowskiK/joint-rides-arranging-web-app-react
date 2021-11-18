import * as React from "react";
import { Link } from "react-router-dom";

import * as css from "../styles/authNavbar.module.scss";

export default class AuthNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMenu = () => {
      this.setState({
        isCollapsed: !this.state.isCollapsed,
      });
    };

    this.closeMenu = () => {
      this.setState({
        isCollapsed: true,
      });
    };

    this.updateDimension = () => {
      this.setState({
        width: window.innerWidth,
      });
    };

    this.componentDidMount = () => {
      window.addEventListener("resize", this.updateDimension);
    };

    this.componentWillUnmount = () => {
      window.removeEventListener("resize", this.updateDimension);
    };

    this.state = {
      isCollapsed: true,
      width: window.innerWidth,
    };
  }

  render() {
    const navMid =
      this.state.width >= 769 ? (
        <div className={css.navMid}>
          <Link to="search" className={css.link} onClick={this.closeMenu}>
            Szukaj przejazdu
          </Link>
          <Link to="rides" className={css.link} onClick={this.closeMenu}>
            Moje przejazdy
          </Link>
          <Link to="friends" className={css.link} onClick={this.closeMenu}>
            Znajomi
          </Link>
        </div>
      ) : null;

    const menuClasses = this.state.isCollapsed
      ? css.menu
      : css.menu + " " + css.menuVisible;

    const menu =
      this.state.width < 769 ? (
        <div className={menuClasses}>
          <Link to="search" className={css.link} onClick={this.closeMenu}>
            Szukaj przejazdu
          </Link>
          <Link to="rides" className={css.link} onClick={this.closeMenu}>
            Moje przejazdy
          </Link>
          <Link to="friends" className={css.link} onClick={this.closeMenu}>
            Znajomi
          </Link>
          <Link to="Me" className={css.link} onClick={this.closeMenu}>
            Mój profil
          </Link>
          <Link to="cars" className={css.link} onClick={this.closeMenu}>
            Moje pojazdy
          </Link>
          <Link to="signout" className={css.link} onClick={this.closeMenu}>
            Wyloguj się
          </Link>
        </div>
      ) : (
        <div className={menuClasses}>
          <Link to="Me" className={css.link} onClick={this.closeMenu}>
            Mój profil
          </Link>
          <Link to="cars" className={css.link} onClick={this.closeMenu}>
            Moje pojazdy
          </Link>
          <Link to="signout" className={css.link} onClick={this.closeMenu}>
            Wyloguj się
          </Link>
        </div>
      );

    return (
      <nav className={css.nav}>
        <div className={css.navLeft}>
          <Link className={css.icons} to="/">
            <svg
              className={css.svg}
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.0002 9.48333L28.3335 16.9833V30H25.0002V20H15.0002V30H11.6668V16.9833L20.0002 9.48333V9.48333ZM20.0002 5L3.3335 20H8.3335V33.3333H18.3335V23.3333H21.6668V33.3333H31.6668V20H36.6668L20.0002 5Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>

        {navMid}

        <div className={css.navRight}>
          <button
            className={css.menuButton + " " + css.icons}
            onClick={this.toggleMenu}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 30H35V26.6667H5V30ZM5 21.6667H35V18.3333H5V21.6667ZM5 10V13.3333H35V10H5Z"
                fill="white"
              />
            </svg>
          </button>
          {menu}
        </div>
      </nav>
    );
  }
}
