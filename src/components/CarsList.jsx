import React from "react";
import CarCard from "./CarCard";
import * as css from "../styles/carsList.module.scss";

export default function CarsList() {
  let cards = [];
  for (let i = 0; i < 5; i++) {
    // TODO change key to be unique
    cards.push(<CarCard key={i} />);
  }

  return (
    <div className={css.carsList}>
      <h1 className={css.header}>Twoje pojazdy</h1>
      <div className={css.cards}>{cards}</div>
    </div>
  );
}
