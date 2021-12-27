import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as css from "./styles/navbar.module.scss";

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function toggleMenu() {
    setIsCollapsed(!isCollapsed);
  }

  const linksClasses = isCollapsed
    ? css.links
    : css.links + " " + css.linksVisible;

  return (
    <nav className={css.nav}>
      <div className={css.navLeft}>
        <Link className={css.icon} to="/">
          <svg
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
      <div className={css.navRight}>
        <div className={linksClasses}>
          <Link to="signin" className={css.link} onClick={toggleMenu}>
            Zaloguj się
          </Link>
          <Link to="signup" className={css.link} onClick={toggleMenu}>
            Zarejestruj się
          </Link>
        </div>

        <button
          className={css.menuButton + " " + css.icon}
          onClick={toggleMenu}
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
      </div>
    </nav>
  );
}
