import React from "react";
import FriendCard from "./FriendCard";
import * as css from "./styles/friendsList.module.scss";

const friendsParams = [
  {
    name: "Kacper",
  },
  {
    name: "Sylwester",
  },
  {
    name: "Piotr",
  },
];

export default function FriendsList() {
  let cards = [];
  for (let i = 0; i < 3; i++) {
    cards.push(<FriendCard key={i} params={friendsParams[i]} />);
  }

  return (
    <div className={css.friendsList}>
      <h1 className={css.header}>Twoi znajomi</h1>
      <div className={css.cards}>{cards}</div>
    </div>
  );
}
