import React, { useState, useEffect } from "react";
import RidesSearchForm from "./RidesSearchForm";
import RidesListHeader from "./RidesListHeader";
import LoadingAnimation from "../../services/LoadingAnimation/LoadingAnimation";
import ky from "ky";
import RideCard from "./RideCard";
import { formatDate } from "../../services/utils";
import Popup from "../../services/Popup/Popup";

export default function Home() {
  const [rideCards, setRideCards] = useState();
  const [headerType, setHeaderType] = useState("last");
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
      setRideCards(null);
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
      <RidesSearchForm
        setRideCards={setRideCards}
        setHeaderType={setHeaderType}
        setPopup={setPopup}
      />
      <RidesListHeader type={headerType} />
      {rideCards === undefined ? (
        <LoadingAnimation />
      ) : rideCards === null ? (
        popup
      ) : (
        rideCards
      )}
    </>
  );
}
