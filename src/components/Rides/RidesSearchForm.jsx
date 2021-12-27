import React from "react";
import { Formik, Form } from "formik";
import { MyTextInput, DateTimePicker } from "../../services/FormComponents";
import * as Yup from "yup";
import * as css from "./styles/ridesSearchForm.module.scss";
import ky from "ky";
import { formatDate } from "../../services/utils";
import RideCard from "./RideCard";
import Popup from "../../services/Popup/Popup";

const RidesSearchForm = (props) => {
  const { setRideCards, setHeaderType, setPopup } = props;

  return (
    <Formik
      initialValues={{
        startLocation: "",
        endLocation: "",
        startTime: "",
      }}
      validationSchema={Yup.object({
        startLocation: Yup.string().required("Podaj miejsce odjazdu"),
        endLocation: Yup.string().required("Podaj miejsce przyjazdu"),
        startTime: Yup.string()
          .nullable()
          .required("Podaj datę i czas wyjazdu"),
      })}
      onSubmit={async (values) => {
        try {
          const rides = await ky
            .post(
              "https://travelapi-app.azurewebsites.net/api/Trips/getTrips",
              {
                json: {
                  startFrom: values.startLocation,
                  endIn: values.endLocation,
                  startTime: values.startTime,
                },
              }
            )
            .json();

          if (rides.length > 0) {
            setHeaderType("search");
          } else {
            setHeaderType("none");
          }

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
              message="Nie udało się pobrać wyników wyszukiwania"
              onAnimationEnd={() => {
                setPopup(null);
              }}
            />
          );
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form noValidate className={css.form}>
          <h1 className={css.header}>Wyszukaj przejazd już teraz!</h1>
          <MyTextInput
            label="Skąd"
            id="startLocation"
            name="startLocation"
            type="text"
            placeholder="Skąd"
            labelclass={css.label}
            inputclass={css.input}
            errorclass={css.error}
          />
          <MyTextInput
            label="Dokąd"
            id="endLocation"
            name="endLocation"
            type="text"
            placeholder="Dokąd"
            labelclass={css.label}
            inputclass={css.input}
            errorclass={css.error}
          />
          <DateTimePicker
            label="Data i czas wyjazdu"
            id="startTime"
            name="startTime"
            placeholder="Wybierz datę i czas wyjazdu"
            labelclass={css.label}
            inputclass={css.input}
            errorclass={css.error}
          />
          <button type="submit" className={css.button} disabled={isSubmitting}>
            Szukaj
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RidesSearchForm;
