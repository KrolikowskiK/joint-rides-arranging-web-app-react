import { Link } from "react-router-dom";
import * as css from "../styles/carsListHeader.module.scss";
const carAdd = new URL("../svgs/rideAdd.svg", import.meta.url);

export default function CarsListHeader() {
  return (
    <div className={css.mainHeader}>
      <h1 className={css.header}>Twoje pojazdy</h1>
      <Link to="new">
        <img width="32" height="32" src={carAdd} alt="carAdd" />
      </Link>
    </div>
  );
}
