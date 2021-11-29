import React from "react";
import RideCard from "./RideCard";
import * as css from "../styles/ridesList.module.scss";
import data from "../data.json";

export default function RidesList() {
  let ridesDetails = data.rides;

  let rideCards = [];
  for (let i = 0; i < 4; i++) {
    rideCards.push(
      <RideCard key={ridesDetails[i].id} rideDetails={ridesDetails[i]} />
    );
  }

  return <div className={css.ridesList}>{rideCards}</div>;
}
