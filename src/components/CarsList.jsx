import React, { useEffect, useState } from "react";
import CarsListHeader from "./CarsListHeader";
import CarCard from "./CarCard";
import * as css from "../styles/carsList.module.scss";
import useCustomKyApi from "../components/KyApi";

const CarsList = () => {
  const api = useCustomKyApi();
  const [cards, setCards] = useState();

  useEffect(async () => {
    try {
      let cards = [];
      const cars = await api
        .get("https://travelapi-app.azurewebsites.net/api/Cars")
        .json();

      cars.forEach((car) => {
        cards.push(<CarCard key={car.id} carDetails={car} />);
      });

      setCards(cards);
    } catch (error) {
      if (error.response && error.response.text) {
        error.response.text().then((errorMessage) => {
          console.log(errorMessage);
        });
      } else {
        console.log("Inny błąd: ", error);
      }
    }
  }, []);

  return cards ? (
    <div className={css.carsList}>
      <CarsListHeader />
      <div className={css.cards}>{cards}</div>
    </div>
  ) : (
    <h2>Ładowanie listy pojazdów</h2>
  );
};

export default CarsList;
