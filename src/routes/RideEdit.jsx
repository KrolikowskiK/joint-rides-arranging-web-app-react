import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import {
  MyTextInput,
  DateTimePicker,
  CustomSelect,
} from "../components/FormComponents";
import * as Yup from "yup";
import * as css from "../styles/rideAdd.module.scss";
import { useNavigate, useParams } from "react-router";
import useCustomKyApi from "../components/KyApi";
import LoadingAnimation from "../components/LoadingAnimation/LoadingAnimation";

const RideEdit = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const api = useCustomKyApi();
  const [userCars, setUserCars] = useState();
  const [rideDetails, setRideDetails] = useState();

  useEffect(async () => {
    try {
      const cars = await api
        .get("https://travelapi-app.azurewebsites.net/api/Cars")
        .json();

      setUserCars(
        cars.map((carDetails) => {
          return {
            key: carDetails.id,
            value: carDetails.mark + " " + carDetails.model,
          };
        })
      );

      const rideDetails = await api
        .get(`https://travelapi-app.azurewebsites.net/api/Trips/${rideId}`)
        .json();

      setRideDetails({
        startLocation: rideDetails.startFrom,
        endLocation: rideDetails.endIn,
        startDateAndTime: new Date(rideDetails.startTime),
        car: rideDetails.car.id,
        availableSeats: rideDetails.numberOfSeats,
        price: rideDetails.price,
      });
    } catch (error) {
      setUserCars(null);
      setRideDetails(null);
    }
  }, []);

  return userCars === undefined || rideDetails === undefined ? (
    <LoadingAnimation />
  ) : userCars === null || rideDetails === null ? (
    <h2 className={css.header}>Nie udało się załadować danych przejazdu</h2>
  ) : (
    <>
      <h1 className={css.header}>Edytuj przejazd</h1>
      <Formik
        initialValues={{
          startLocation: rideDetails.startLocation,
          endLocation: rideDetails.endLocation,
          startDateAndTime: rideDetails.startDateAndTime,
          car: rideDetails.car,
          availableSeats: rideDetails.availableSeats,
          price: rideDetails.price,
        }}
        validationSchema={Yup.object({
          startLocation: Yup.string().required("Podaj miejsce wyjazdu"),
          endLocation: Yup.string().required("Podaj miejsce przyjazdu"),
          startDateAndTime: Yup.string().required("Podaj datę i czas wyjazdu"),
          car: Yup.string().required("Wybierz samochód"),
          availableSeats: Yup.number()
            .typeError("Podaj liczbę")
            .integer("Podaj liczbę całkowitą")
            .required("Podaj liczbę dostępnych miejsc"),
          price: Yup.number()
            .typeError("Podaj liczbę")
            .required("Podaj cenę przejazdu"),
        })}
        onSubmit={async (values) => {
          //   try {
          //     await api.post(
          //       "https://travelapi-app.azurewebsites.net",
          //       {
          //         json: {
          //           startFrom: values.startLocation,
          //           endIn: values.endLocation,
          //           startTime: values.startDateAndTime,
          //           carID: values.car,
          //           numberOfSeats: values.availableSeats,
          //           price: values.price,
          //         },
          //       }
          //     );
          //     navigate("/rides");
          //   } catch (error) {
          //     if (error.response && error.response.text) {
          //       error.response.text().then((errorMessage) => {
          //         console.log(errorMessage);
          //       });
          //     } else {
          //       console.log("Inny błąd: ", error);
          //     }
          //   }
        }}
      >
        {({ isSubmitting }) => (
          <Form noValidate className={css.form}>
            <div className={css.startLocation}>
              <MyTextInput
                id="startLocation"
                name="startLocation"
                type="text"
                label="Miejsce odjazdu"
                placeholder="Miejsce odjazdu"
                labelclass={css.label}
                inputclass={css.input}
                errorclass={css.error}
              />
            </div>
            <div className={css.endLocation}>
              <MyTextInput
                id="endLocation"
                name="endLocation"
                type="text"
                label="Miejsce przyjazdu"
                placeholder="Miejsce przyjazdu"
                labelclass={css.label}
                inputclass={css.input}
                errorclass={css.error}
              />
            </div>
            <div className={css.startDateAndTime}>
              <DateTimePicker
                label="Data i czas wyjazdu"
                id="startDateAndTime"
                name="startDateAndTime"
                labelclass={css.label}
                inputclass={css.input}
                errorclass={css.error}
              />
            </div>
            <div className={css.car}>
              <CustomSelect
                id="car"
                name="car"
                label="Samochód"
                options={userCars}
                labelclass={css.label}
                inputclass={css.input}
                errorclass={css.error}
              />
            </div>
            <div className={css.availableSeats}>
              <MyTextInput
                id="availableSeats"
                name="availableSeats"
                type="text"
                label="Wolne miejsca"
                placeholder="Wolne miejsca"
                labelclass={css.label}
                inputclass={css.input}
                errorclass={css.error}
              />
            </div>
            <div className={css.price}>
              <MyTextInput
                id="price"
                name="price"
                type="text"
                label="Cena"
                placeholder="Cena"
                labelclass={css.label}
                inputclass={css.input}
                errorclass={css.error}
              />
            </div>
            <button
              className={css.button}
              type="submit"
              disabled={isSubmitting}
            >
              Zapisz zmiany
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RideEdit;
