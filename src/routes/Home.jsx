import * as React from "react";

import { Context } from "../Context";

import Browser from "../components/Browser";

import * as css from "../styles/home.module.scss";

export default function Home() {
  return <Context.Consumer>{(value) => <Browser />}</Context.Consumer>;
}
