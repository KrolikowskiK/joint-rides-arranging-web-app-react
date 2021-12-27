import React from "react";
import { Link } from "react-router-dom";
import * as css from "./styles/ridesListHeader.module.scss";
const rideToggle = new URL("/src/svgs/rideToggle.svg", import.meta.url);
const rideAdd = new URL("/src/svgs/rideAdd.svg", import.meta.url);

export default function RidesListHeader(props) {
  let header;
  const buttons = (
    <div className={css.buttons}>
      <button
        className={css.toggle}
        onClick={() => {
          props.toggle();
        }}
      >
        <img width="23" height="32" src={rideToggle} alt="rideToggle" />
      </button>
      <Link to="new">
        <img width="32" height="32" src={rideAdd} alt="rideAdd" />
      </Link>
    </div>
  );

  switch (props.type) {
    case "rides-all":
      header = (
        <>
          <h1 className={css.header}>Wszystkie przejazdy</h1>
          {buttons}
        </>
      );
      break;
    case "rides-my":
      header = (
        <>
          <h1 className={css.header}>Przejazdy jako kierowca</h1>
          {buttons}
        </>
      );
      break;
    case "search":
      header = <h1 className={css.header}>Znalezione przejazdy</h1>;
      break;
    case "last":
      header = <h1 className={css.header}>Ostatnie przejazdy</h1>;
      break;
    case "none":
      header = <h1 className={css.header}>Nie znaleziono przejazdów</h1>;
      break;
    default:
      header = <h1 className={css.header}>Przejazdy</h1>;
  }

  return <div className={css.mainHeader}>{header}</div>;
}
