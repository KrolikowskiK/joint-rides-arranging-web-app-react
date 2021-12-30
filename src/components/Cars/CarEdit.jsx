import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { MyTextInput } from "../../services/FormComponents";
import * as Yup from "yup";
import * as css from "./styles/carAdd.module.scss";
import { useNavigate, useParams } from "react-router";
import useCustomKyApi from "../../hooks/KyApi";

const CarEdit = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const api = useCustomKyApi();
  const [carDetails, setCarDetails] = useState(null);

  useEffect(async () => {
    try {
      const details = await api
        .get(`https://travelapi-app.azurewebsites.net/api/Cars/${carId}`)
        .json();
      setCarDetails({
        id: details.id || "",
        mark: details.mark || "",
        model: details.model || "",
        registrationNumber: details.registrationNumber || "",
        productionYear: details.productionYear || "",
        numberOfSeats: details.numberOfSeats || "",
        color: details.color || "",
      });
    } catch (error) {
      if (error.response && error.response.text) {
        error.response.text().then((errorMessage) => {
          console.log(errorMessage);
        });
      } else {
        console.log("Inny błąd: ", error);
      }
      setCarDetails({
        id: "",
        mark: "",
        model: "",
        registrationNumber: "",
        productionYear: "",
        numberOfSeats: "",
        color: "",
      });
    }
  }, []);

  return carDetails === null ? (
    <h2>Ładowanie danych pojazdu</h2>
  ) : (
    <>
      <h1 className={css.header}>Zmień dane samochodu</h1>
      <Formik
        initialValues={{
          mark: carDetails.mark,
          model: carDetails.model,
          registrationNumber: carDetails.registrationNumber,
          productionYear: carDetails.productionYear,
          numberOfSeats: carDetails.numberOfSeats,
          color: carDetails.color,
        }}
        validationSchema={Yup.object({
          mark: Yup.string().required("Podaj markę samochodu"),
          model: Yup.string().required("Podaj model samochodu"),
          registrationNumber: Yup.string().required(
            "Podaj numer rejestracyjny samochodu"
          ),
          //   TODO check if productionYear is 4 characters
          productionYear: Yup.number()
            .typeError("Podaj liczbę")
            .integer("Podaj liczbę całkowitą")
            .required("Podaj rok produkcji samochodu"),
          numberOfSeats: Yup.number()
            .typeError("Podaj liczbę")
            .integer("Podaj liczbę całkowitą")
            .required("Podaj liczbę siedzeń w samochodzie"),
          color: Yup.string().required("Podaj kolor samochodu"),
        })}
        onSubmit={async (values) => {
          try {
            await api.patch(
              "https://travelapi-app.azurewebsites.net/api/Cars/EditCar",
              {
                json: {
                  id: carDetails.id,
                  mark: values.mark,
                  model: values.model,
                  registrationNumber: values.registrationNumber,
                  productionYear: values.productionYear,
                  numberOfSeats: values.numberOfSeats,
                  color: values.color,
                },
              }
            );

            navigate("/cars");
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
            <div className={css.fields}>
              <div className={css.mark}>
                <MyTextInput
                  id="mark"
                  name="mark"
                  type="text"
                  label="Marka"
                  placeholder="Marka"
                  labelclass={css.label}
                  inputclass={css.input}
                  errorclass={css.error}
                />
              </div>
              <div className={css.model}>
                <MyTextInput
                  id="model"
                  name="model"
                  type="text"
                  label="Model"
                  placeholder="Model"
                  labelclass={css.label}
                  inputclass={css.input}
                  errorclass={css.error}
                />
              </div>
              <div className={css.productionYear}>
                <MyTextInput
                  id="productionYear"
                  name="productionYear"
                  type="text"
                  label="Rok produkcji"
                  placeholder="Rok produkcji"
                  labelclass={css.label}
                  inputclass={css.input}
                  errorclass={css.error}
                />
              </div>
              <div className={css.registrationNumber}>
                <MyTextInput
                  id="registrationNumber"
                  name="registrationNumber"
                  type="text"
                  label="Numer rejestracyjny"
                  placeholder="Numer rejestracyjny"
                  labelclass={css.label}
                  inputclass={css.input}
                  errorclass={css.error}
                />
              </div>
              <div className={css.numberOfSeats}>
                <MyTextInput
                  id="numberOfSeats"
                  name="numberOfSeats"
                  type="text"
                  label="Liczba siedzeń"
                  placeholder="Liczba siedzeń"
                  labelclass={css.label}
                  inputclass={css.input}
                  errorclass={css.error}
                />
              </div>
              <div className={css.color}>
                <MyTextInput
                  id="color"
                  name="color"
                  type="text"
                  label="Kolor"
                  placeholder="Kolor"
                  labelclass={css.label}
                  inputclass={css.input}
                  errorclass={css.error}
                />
              </div>
            </div>
            <div className={css.buttons}>
              <button
                className={css.submit}
                type="submit"
                disabled={isSubmitting}
              >
                Dodaj pojazd
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CarEdit;
