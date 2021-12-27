import React, { useEffect, useState } from "react";
import CarsListHeader from "./CarsListHeader";
import CarCard from "./CarCard";
import * as css from "./styles/carsList.module.scss";
import useCustomKyApi from "../../hooks/KyApi";

const CarsList = () => {
  const api = useCustomKyApi();
  const [carCards, setCarCards] = useState();

  useEffect(async () => {
    try {
      const cars = await api
        .get("https://travelapi-app.azurewebsites.net/api/Cars")
        .json();

      if (cars.error === "Nie posiadasz samochodów") {
        setCarCards(<h2 className={css.header}>Nie posiadasz samochodów</h2>);
      } else {
        setCarCards(
          cars.map((carDetails) => {
            return <CarCard key={carDetails.id} carDetails={carDetails} />;
          })
        );
      }
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

  return carCards ? (
    <div className={css.carsList}>
      <CarsListHeader />
      <div className={css.carCards}>{carCards}</div>
    </div>
  ) : (
    <h2>Ładowanie listy pojazdów</h2>
  );
};

export default CarsList;
