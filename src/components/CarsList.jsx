import React from "react";
import CarsListHeader from "./CarsListHeader";
import CarCard from "./CarCard";
import * as css from "../styles/carsList.module.scss";
import data from "../data.json";

export default function CarsList() {
  let carsDetails = data.cars;
  let cards = [];

  for (let i = 0; i < 3; i++) {
    cards.push(<CarCard key={carsDetails[i].id} carDetails={carsDetails[i]} />);
  }

  return (
    <div className={css.carsList}>
      <CarsListHeader />
      <div className={css.cards}>{cards}</div>
    </div>
  );
}
