import React from "react";
import { UserContext } from "./App";
import Browser from "../components/Browser";
import RidesListHeader from "../components/RidesListHeader";
import RidesList from "../components/RidesList";

export default function Home() {
  const context = React.useContext(UserContext);
  const headerType = context.state.isAuthenticated ? "recommended" : "last";
  return (
    <>
      <Browser />
      <RidesListHeader type={headerType} />
      <RidesList />
    </>
  );
}
