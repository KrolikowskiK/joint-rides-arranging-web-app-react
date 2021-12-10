import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as css from "../styles/carDetails.module.scss";
import useCustomKyApi from "../components/KyApi";

const CarDetails = () => {
  const navigate = useNavigate();
  const api = useCustomKyApi();
  let { carId } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(async () => {
    try {
      const carDetails = await api
        .get(`https://travelapi-app.azurewebsites.net/api/Cars/${carId}`)
        .json();
      setCarDetails(carDetails);
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

  const deleteCar = async () => {
    setIsDeleting(true);
    try {
      await api.delete(
        `https://travelapi-app.azurewebsites.net/api/Cars/${carId}`
      );
    } catch (error) {
      if (error.response && error.response.text) {
        error.response.text().then((errorMessage) => {
          console.log(errorMessage);
        });
      } else {
        console.log("Inny błąd: ", error);
      }
    }
    setIsDeleting(false);
    navigate("/cars");
  };

  return carDetails === null ? (
    <h2>Ładowanie danych pojazdu</h2>
  ) : (
    <>
      <h2 className={css.header}>Szczegóły pojazdu</h2>
      <div className={css.details}>
        <div className={css.mark}>
          <div className={css.label}>Marka:</div>
          <div className={css.value}>{carDetails.mark}</div>
        </div>
        <div className={css.model}>
          <div className={css.label}>Model:</div>
          <div className={css.value}>{carDetails.model}</div>
        </div>
        <div className={css.registrationNumber}>
          <div className={css.label}>Numer rejestracyjny:</div>
          <div className={css.value}>{carDetails.registrationNumber}</div>
        </div>
        <div className={css.productionYear}>
          <div className={css.label}>Rok produkcji:</div>
          <div className={css.value}>{carDetails.productionYear}</div>
        </div>
        <div className={css.numberOfSeats}>
          <div className={css.label}>Liczba siedzeń:</div>
          <div className={css.value}>{carDetails.numberOfSeats}</div>
        </div>
        <div className={css.color}>
          <div className={css.label}>Kolor:</div>
          <div className={css.value}>{carDetails.color}</div>
        </div>
        <Link to="edit" className={css.edit}>
          Edytuj
        </Link>
        <button
          onClick={deleteCar}
          disabled={isDeleting}
          className={css.delete}
        >
          Usuń
        </button>
      </div>
    </>
  );
};

export default CarDetails;
