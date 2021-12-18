import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import {
  MyTextInput,
  DateTimePicker,
  CustomSelect,
} from "../components/FormComponents";
import * as Yup from "yup";
import * as css from "../styles/rideAdd.module.scss";
import useCustomKyApi from "../components/KyApi";
import LoadingAnimation from "../components/LoadingAnimation/LoadingAnimation";

const RideAdd = () => {
  const navigate = useNavigate();
  const api = useCustomKyApi();
  const [userCars, setUserCars] = useState();

  useEffect(async () => {
    try {
      const cars = await api
        .get("https://travelapi-app.azurewebsites.net/api/Cars")
        .json();

      if (cars.error === "Nie posiadasz samochodów") {
        setUserCars([]);
      } else {
        setUserCars(
          cars.map((carDetails) => {
            return {
              key: carDetails.id,
              value: carDetails.mark + " " + carDetails.model,
            };
          })
        );
      }
    } catch (error) {
      setUserCars(null);
    }
  }, []);

  return userCars === undefined ? (
    <LoadingAnimation />
  ) : userCars === null ? (
    <h2 className={css.header}>Nie udało się pobrać danych pojazdów</h2>
  ) : userCars.length === 0 ? (
    <h2 className={css.header}>Najpierw dodaj swój pierwszy pojazd</h2>
  ) : (
    <>
      <h1 className={css.header}>Nowy przejazd</h1>
      <Formik
        initialValues={{
          startLocation: "",
          endLocation: "",
          startDateAndTime: "",
          car: "",
          availableSeats: "",
          price: "",
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
          try {
            await api.post(
              "https://travelapi-app.azurewebsites.net/api/Trips/addTrip",
              {
                json: {
                  startFrom: values.startLocation,
                  endIn: values.endLocation,
                  startTime: values.startDateAndTime,
                  carID: values.car,
                  numberOfSeats: values.availableSeats,
                  price: values.price,
                },
              }
            );
            navigate("/rides");
          } catch (error) {
            if (error.response && error.response.text) {
              error.response.text().then((errorMessage) => {
                console.log(errorMessage);
              });
            } else {
              console.log("Inny błąd: ", error);
            }
          }
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
              Dodaj przejazd
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RideAdd;
