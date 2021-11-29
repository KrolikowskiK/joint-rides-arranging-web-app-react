import React from "react";
import * as css from "../styles/friendCard.module.scss";
const friendAvatar = new URL("../svgs/friendAvatar.svg", import.meta.url);
const cross = new URL("../svgs/cross.svg", import.meta.url);

export default function FriendCard(props) {
  return (
    <div className={css.card}>
      <object
        className={css.img}
        width="55"
        height="60"
        data={friendAvatar}
        title="friendAvatar"
      ></object>
      <div className={css.name}>{props.params.name}</div>
      <button>
        <object
          className={css.cross}
          width="30"
          height="30"
          data={cross}
          title="cross"
        ></object>
      </button>
    </div>
  );
}
