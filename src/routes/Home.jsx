import React from "react";
import RidesSearchForm from "../components/RidesSearchForm";
import RidesListHeader from "../components/RidesListHeader";
import RidesList from "../components/RidesList";

export default function Home() {
  return (
    <>
      <RidesSearchForm />
      <RidesListHeader type="last" />
      <RidesList />
    </>
  );
}
