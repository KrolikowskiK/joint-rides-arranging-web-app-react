import React from "react";
import { useParams } from "react-router";
import * as css from "../styles/carDetails.module.scss";
import data from "../data.json";

export default function CarDetails() {
  let { carId } = useParams();
  const carDetails = data.cars[carId];
  return (
    <>
      <h2 className={css.header}>Szczegóły pojazdu</h2>
      <div className={css.details}>
        <div className={css.mark}>
          <div className={css.label}>Marka:</div>
          <div className={css.value}>{carDetails.mark}</div>
        </div>
        <div className={css.model}>
          <div className={css.label}>Model:</div>
          <div className={css.value}>{carDetails.model}</div>
        </div>
        <div className={css.registrationNumber}>
          <div className={css.label}>Numer rejestracyjny:</div>
          <div className={css.value}>{carDetails.registrationNumber}</div>
        </div>
        <div className={css.numberOfSeats}>
          <div className={css.label}>Liczba siedzeń:</div>
          <div className={css.value}>{carDetails.numberOfSeats}</div>
        </div>
        <div className={css.color}>
          <div className={css.label}>Kolor:</div>
          <div className={css.value}>{carDetails.color}</div>
        </div>
        <button className={css.button}>Edytuj</button>
      </div>
    </>
  );
}
