import React from "react";
import FriendCard from "./FriendCard";
import * as css from "../styles/friendsList.module.scss";

export default function FriendsList() {
  let cards = [];
  for (let i = 0; i < 5; i++) {
    // TODO change key to be unique
    cards.push(<FriendCard key={i} />);
  }

  return (
    <div className={css.friendsList}>
      <h1 className={css.header}>Twoi znajomi</h1>
      <div className={css.cards}>{cards}</div>
    </div>
  );
}
