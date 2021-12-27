import React from "react";
import RidesListHeader from "./RidesListHeader";
import RidesList from "./RidesList";

export default function Rides() {
  const [displayMode, setDisplayMode] = React.useState("rides-all");

  function toggleDisplayMode() {
    if (displayMode == "rides-all") {
      setDisplayMode("rides-my");
    } else {
      setDisplayMode("rides-all");
    }
  }

  return (
    <>
      <RidesListHeader type={displayMode} toggle={toggleDisplayMode} />
      <RidesList />
    </>
  );
}
