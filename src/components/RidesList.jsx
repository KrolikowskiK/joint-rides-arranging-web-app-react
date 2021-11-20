import React from "react";
import RideCard from "./RideCard";
import * as css from "../styles/ridesList.module.scss";

export default function RidesList() {
  let rideCards = [];
  for (let i = 0; i < 5; i++) {
    rideCards.push(<RideCard key={i} />);
  }

  return <div className={css.ridesList}>{rideCards}</div>;
}
