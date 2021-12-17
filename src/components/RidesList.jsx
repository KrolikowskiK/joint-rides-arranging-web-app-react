import React, { useState, useEffect } from "react";
import RideCard from "./RideCard";
import useCustomKyApi from "../components/KyApi";
import * as css from "../styles/ridesList.module.scss";
import { formatDate } from "../utils";
import LoadingAnimation from "./LoadingAnimation/LoadingAnimation";
import Popup from "./Popup/Popup";

const RidesList = () => {
  const api = useCustomKyApi();
  const [rideCards, setRideCards] = useState();
  const [popup, setPopup] = useState(null);

  useEffect(async () => {
    try {
      const ridesDetails = await api
        .get("https://travelapi-app.azurewebsites.net/api/Trips/myTrips")
        .json();

      setRideCards(
        ridesDetails.map((details) => {
          const rideDetails = {
            id: details.id,
            startDest: details.startFrom,
            endDest: details.endIn,
            startDateAndTime: formatDate(new Date(details.startTime)),
            driver: details.creator.name,
            price: details.price,
          };
          return <RideCard key={rideDetails.id} rideDetails={rideDetails} />;
        })
      );
    } catch (error) {
      setPopup(
        <Popup
          message="Nie udało się pobrać przejazdów"
          onAnimationEnd={() => {
            setPopup(null);
          }}
        />
      );
      setRideCards(null);
    }
  }, []);

  return rideCards === undefined ? (
    <LoadingAnimation />
  ) : rideCards === null ? (
    popup
  ) : rideCards.length > 0 ? (
    <div className={css.ridesList}>{rideCards}</div>
  ) : (
    <h2 className={css.header}>Brak przejazdów</h2>
  );
};

export default RidesList;
