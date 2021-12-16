import React from "react";
import * as css from "./style.module.scss";

const Popup = (props) => {
  const { message, onAnimationEnd } = props;
  return (
    <h2 className={css.popup} onAnimationEnd={onAnimationEnd}>
      {message}
    </h2>
  );
};

export default Popup;
