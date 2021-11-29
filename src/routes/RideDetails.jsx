import React from "react";
import { useParams } from "react-router";
import * as css from "../styles/rideDetails.module.scss";
import data from "../data.json";

export default function RideDetails() {
  let { rideId } = useParams();
  const rideDetails = data.rides[rideId];

  return (
    <>
      <h2 className={css.header}>Szczegóły przejazdu</h2>
      <div className={css.details}>
        <div className={css.startDest}>
          <div className={css.label}>Miejsce początkowe:</div>
          <div className={css.value}>{rideDetails.startDest}</div>
        </div>
        <div className={css.endDest}>
          <div className={css.label}>Miejsce docelowe:</div>
          <div className={css.value}>{rideDetails.endDest}</div>
        </div>
        <div className={css.startDate}>
          <div className={css.label}>Data wyjazdu:</div>
          <div className={css.value}>{rideDetails.startDate}</div>
        </div>
        <div className={css.startTime}>
          <div className={css.label}>Czas wyjazdu:</div>
          <div className={css.value}>{rideDetails.startTime}</div>
        </div>
        <div className={css.endTime}>
          <div className={css.label}>Czas przyjazdu:</div>
          <div className={css.value}>{rideDetails.endTime}</div>
        </div>
        <div className={css.driver}>
          <div className={css.label}>Kierowca:</div>
          <div className={css.value}>{rideDetails.driver}</div>
        </div>
        <div className={css.price}>
          <div className={css.label}>Cena:</div>
          <div className={css.value}>{rideDetails.price} zł</div>
        </div>
        <button className={css.button}>Wyślij prośbę o dołączenie</button>
      </div>
    </>
  );
}
