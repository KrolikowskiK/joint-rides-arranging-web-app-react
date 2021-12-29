import React from "react";
import * as css from "./opinion.module.scss";

const Opinion = (params) => {
  const { rate, date, text } = params;

  return (
    <div className={css.opinion}>
      <div className={css.stars}>
        <span
          id="1"
          className={rate > 0 ? "fa fa-star " + css.checked : "fa fa-star"}
        ></span>
        <span
          id="2"
          className={rate > 1 ? "fa fa-star " + css.checked : "fa fa-star"}
        ></span>
        <span
          id="3"
          className={rate > 2 ? "fa fa-star " + css.checked : "fa fa-star"}
        ></span>
        <span
          id="4"
          className={rate > 3 ? "fa fa-star " + css.checked : "fa fa-star"}
        ></span>
        <span
          id="5"
          className={rate > 4 ? "fa fa-star " + css.checked : "fa fa-star"}
        ></span>
      </div>
      <div className={css.date}>{date}</div>
      <div className={css.text}>{text}</div>
    </div>
  );
};

export default Opinion;
