import React from "react";
import { Link } from "react-router-dom";
import * as css from "../styles/rideCard.module.scss";
const start = new URL("../svgs/start.svg", import.meta.url);
const end = new URL("../svgs/end.svg", import.meta.url);
const date = new URL("../svgs/date.svg", import.meta.url);
const time = new URL("../svgs/time.svg", import.meta.url);
const driver = new URL("../svgs/driver.svg", import.meta.url);
const price = new URL("../svgs/price.svg", import.meta.url);

export default function RideCart(props) {
  const rideDetails = props.rideDetails;
  return (
    <Link to={"/rides/" + rideDetails.id.toString()} className={css.ride}>
      <div className={css.start}>
        <object width="20" height="35" data={start} title="start"></object>
        <div>{rideDetails.startDest}</div>
      </div>

      <div className={css.end}>
        <object width="20" height="35" data={end} title="end"></object>
        <div>{rideDetails.endDest}</div>
      </div>

      <div className={css.date}>
        <object height="35px" width="35px" data={date} title="date"></object>
        <div>{rideDetails.startDate}</div>
      </div>

      <div className={css.time}>
        <object height="35px" width="35px" data={time} title="time"></object>
        <div>{rideDetails.startTime}</div>
      </div>

      <div className={css.driver}>
        <object
          height="35px"
          width="35px"
          data={driver}
          title="driver"
        ></object>
        <div>{rideDetails.driver}</div>
      </div>

      <div className={css.price}>
        <object height="26px" width="35px" data={price} title="price"></object>
        <div>{rideDetails.price} zł</div>
      </div>
    </Link>
  );
}
