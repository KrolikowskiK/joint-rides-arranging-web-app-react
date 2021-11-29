import React from "react";
import { Formik, Form } from "formik";
import { MyTextInput } from "../components/FormComponents";
import * as Yup from "yup";
import * as css from "../styles/rideAdd.module.scss";

export default function RideAdd() {
  return (
    <>
      <h1 className={css.header}>Nowy przejazd</h1>
      <Formik
        initialValues={{
          startLocation: "",
          endLocation: "",
          startDate: "",
          startTime: "",
          endTime: "",
          car: "",
          availableSeats: "",
          price: "",
        }}
        validationSchema={Yup.object({
          startLocation: Yup.string().required("Required"),
          endLocation: Yup.string().required("Required"),
          startDate: Yup.string().required("Required"),
          startTime: Yup.string().required("Required"),
          endTime: Yup.string().required("Required"),
          car: Yup.string().required("Required"),
          availableSeats: Yup.string().required("Required"),
          price: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
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
          <div className={css.startDate}>
            <MyTextInput
              id="startDate"
              name="startDate"
              type="text"
              label="Data"
              placeholder="Data"
              labelclass={css.label}
              inputclass={css.input}
              errorclass={css.error}
            />
          </div>
          <div className={css.startTime}>
            <MyTextInput
              id="startTime"
              name="startTime"
              type="text"
              label="Czas odjazdu"
              placeholder="Czas odjazdu"
              labelclass={css.label}
              inputclass={css.input}
              errorclass={css.error}
            />
          </div>
          <div className={css.endTime}>
            <MyTextInput
              id="endTime"
              name="endTime"
              type="text"
              label="Czas przyjazdu"
              placeholder="Czas przyjazdu"
              labelclass={css.label}
              inputclass={css.input}
              errorclass={css.error}
            />
          </div>
          <div className={css.car}>
            <MyTextInput
              id="car"
              name="car"
              type="text"
              label="Samochód"
              placeholder="Samochód"
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
          <button className={css.button} type="submit">
            Dodaj przejazd
          </button>
        </Form>
      </Formik>
    </>
  );
}
