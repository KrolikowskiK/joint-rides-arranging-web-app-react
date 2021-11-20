import React from "react";
import { Link } from "react-router-dom";
import * as css from "../styles/ridesListHeader.module.scss";

export default function RidesListHeader(props) {
  let header;
  switch (props.type) {
    case "rides-all":
      header = (
        <>
          <h1 className={css.header}>Wszystkie przejazdy</h1>
          <div className={css.buttons}>
            <button
              onClick={() => {
                props.toggle();
              }}
            >
              <svg
                width="23"
                height="32"
                viewBox="0 0 23 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 4.36364V0L5.75 5.81818L11.5 11.6364V7.27273C16.2581 7.27273 20.125 11.1855 20.125 16C20.125 17.4691 19.7656 18.8655 19.1187 20.0727L21.2175 22.1964C22.3388 20.4073 23 18.2836 23 16C23 9.57091 17.8538 4.36364 11.5 4.36364ZM11.5 24.7273C6.74188 24.7273 2.875 20.8145 2.875 16C2.875 14.5309 3.23437 13.1345 3.88125 11.9273L1.7825 9.80364C0.66125 11.5927 0 13.7164 0 16C0 22.4291 5.14625 27.6364 11.5 27.6364V32L17.25 26.1818L11.5 20.3636V24.7273Z"
                  fill="#592626"
                />
              </svg>
            </button>
            <Link to="#">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 18.2857H18.2857V32H13.7143V18.2857H0V13.7143H13.7143V0H18.2857V13.7143H32V18.2857Z"
                  fill="#592626"
                />
              </svg>
            </Link>
          </div>
        </>
      );
      break;
    case "rides-my":
      header = (
        <>
          <h1 className={css.header}>Przejazdy jako kierowca</h1>
          <div className={css.buttons}>
            <button
              onClick={() => {
                props.toggle();
              }}
            >
              <svg
                width="23"
                height="32"
                viewBox="0 0 23 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 4.36364V0L5.75 5.81818L11.5 11.6364V7.27273C16.2581 7.27273 20.125 11.1855 20.125 16C20.125 17.4691 19.7656 18.8655 19.1187 20.0727L21.2175 22.1964C22.3388 20.4073 23 18.2836 23 16C23 9.57091 17.8538 4.36364 11.5 4.36364ZM11.5 24.7273C6.74188 24.7273 2.875 20.8145 2.875 16C2.875 14.5309 3.23437 13.1345 3.88125 11.9273L1.7825 9.80364C0.66125 11.5927 0 13.7164 0 16C0 22.4291 5.14625 27.6364 11.5 27.6364V32L17.25 26.1818L11.5 20.3636V24.7273Z"
                  fill="#592626"
                />
              </svg>
            </button>
            <Link to="#">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 18.2857H18.2857V32H13.7143V18.2857H0V13.7143H13.7143V0H18.2857V13.7143H32V18.2857Z"
                  fill="#592626"
                />
              </svg>
            </Link>
          </div>
        </>
      );
      break;
    case "recommended":
      header = <h1 className={css.header}>Rekomendowane przejazdy</h1>;
      break;
    case "search":
      header = <h1 className={css.header}>Znalezione przejazdy</h1>;
      break;
    case "last":
      header = <h1 className={css.header}>Ostatnie przejazdy</h1>;
      break;
    default:
      header = <h1 className={css.header}>Przejazdy</h1>;
  }
  console.log(header);

  return <div className={css.mainHeader}>{header}</div>;
}
