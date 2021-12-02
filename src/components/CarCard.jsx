import React from "react";
import { Link } from "react-router-dom";
import * as css from "../styles/carCard.module.scss";
const car = new URL("../svgs/car.svg", import.meta.url);

export default function CarCard(props) {
  const carDetails = props.carDetails;
  const name = `${carDetails.mark} ${carDetails.model}`;

  return (
    <Link to={"/cars/" + carDetails.id.toString()} className={css.card}>
      <img width="47" height="42" src={car} alt="carImage" />
      <div className={css.name}>{name}</div>
    </Link>
  );
}
