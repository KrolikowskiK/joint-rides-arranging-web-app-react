import React from "react";
import useAuth from "../components/Auth";
import RidesSearchForm from "../components/RidesSearchForm";
import RidesListHeader from "../components/RidesListHeader";
import RidesList from "../components/RidesList";

export default function Home() {
  const { token } = useAuth();
  const headerType = token ? "recommended" : "last";

  return (
    <>
      <RidesSearchForm />
      <RidesListHeader type={headerType} />
      <RidesList />
    </>
  );
}
