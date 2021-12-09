import React, { useState } from "react";
import * as css from "../styles/opinion.module.scss";

const Opinion = () => {
  const [stars, setStars] = useState(1);
  const fun = (e) => {
    setStars(e.target.id);
  };

  return (
    <div className={css.opinion}>
      <div className={css.stars}>
        <span
          id="1"
          className={stars > 0 ? "fa fa-star " + css.checked : "fa fa-star"}
          onMouseOver={fun}
        ></span>
        <span
          id="2"
          className={stars > 1 ? "fa fa-star " + css.checked : "fa fa-star"}
          onMouseOver={fun}
        ></span>
        <span
          id="3"
          className={stars > 2 ? "fa fa-star " + css.checked : "fa fa-star"}
          onMouseOver={fun}
        ></span>
        <span
          id="4"
          className={stars > 3 ? "fa fa-star " + css.checked : "fa fa-star"}
          onMouseOver={fun}
        ></span>
        <span
          id="5"
          className={stars > 4 ? "fa fa-star " + css.checked : "fa fa-star"}
          onMouseOver={fun}
        ></span>
      </div>
      <div className={css.date}>18/12/2021</div>
      <div className={css.text}>Super przejazd! Polecam! Anna Wachowicz</div>
    </div>
  );
};

export default Opinion;
