import React, { useState, useEffect } from "react";
import RidesSearchForm from "../components/RidesSearchForm";
import RidesListHeader from "../components/RidesListHeader";
import LoadingAnimation from "../components/LoadingAnimation/LoadingAnimation";
import ky from "ky";
import RideCard from "../components/RideCard";
import { formatDate } from "../utils";
import Popup from "../components/Popup/Popup";

export default function Home() {
  const [rideCards, setRideCards] = useState([]);
  const [popup, setPopup] = useState(null);

  useEffect(async () => {
    try {
      const rides = await ky
        .get("https://travelapi-app.azurewebsites.net/api/Trips")
        .json();

      setRideCards(
        rides.map((rideDetails) => {
          const rides = {
            id: rideDetails.id,
            startDest: rideDetails.startFrom,
            endDest: rideDetails.endIn,
            startDateAndTime: formatDate(new Date(rideDetails.startTime)),
            driver: rideDetails.creator.name,
            price: rideDetails.price,
          };
          return <RideCard key={rides.id} rideDetails={rides} />;
        })
      );
    } catch (error) {
      setPopup(
        <Popup
          message="Nie udało się pobrać ostatnich przejazdów"
          onAnimationEnd={() => {
            setPopup(null);
          }}
        />
      );
    }
  }, []);

  return (
    <>
      <RidesSearchForm />
      <RidesListHeader type="last" />
      {rideCards.length > 0 ? rideCards : <LoadingAnimation />}
      {popup}
    </>
  );
}
