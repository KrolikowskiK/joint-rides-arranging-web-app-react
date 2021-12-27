import React from "react";
import { Link } from "react-router-dom";
import * as css from "./styles/rideCard.module.scss";
const startSVG = new URL("/src/svgs/start.svg", import.meta.url);
const endSVG = new URL("/src/svgs/end.svg", import.meta.url);
const dateSVG = new URL("/src/svgs/date.svg", import.meta.url);
const driverSVG = new URL("/src/svgs/driver.svg", import.meta.url);
const priceSVG = new URL("/src/svgs/price.svg", import.meta.url);

const RideCard = (props) => {
  const { id, startDest, endDest, startDateAndTime, driver, price } =
    props.rideDetails;
  return (
    <Link to={"/rides/" + id.toString()} className={css.ride}>
      <div className={css.start}>
        <object width="20" height="35" data={startSVG} title="start"></object>
        <div>{startDest}</div>
      </div>

      <div className={css.end}>
        <object width="20" height="35" data={endSVG} title="end"></object>
        <div>{endDest}</div>
      </div>

      <div className={css.date}>
        <object height="35px" width="35px" data={dateSVG} title="date"></object>
        <div>{startDateAndTime}</div>
      </div>

      <div className={css.driver}>
        <object
          height="35px"
          width="35px"
          data={driverSVG}
          title="driver"
        ></object>
        <div>{driver}</div>
      </div>

      <div className={css.price}>
        <object
          height="26px"
          width="35px"
          data={priceSVG}
          title="price"
        ></object>
        <div>{price} zł</div>
      </div>
    </Link>
  );
};

export default RideCard;
