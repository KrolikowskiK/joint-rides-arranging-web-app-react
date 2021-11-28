import React from "react";
import { Formik, Form } from "formik";
import { MyTextInput } from "../components/FormComponents";
import * as Yup from "yup";
import * as css from "../styles/ridesSearchForm.module.scss";

export default function RidesSearchForm() {
  return (
    <Formik
      initialValues={{
        startDest: "",
        endDest: "",
        dateTime: "",
      }}
      validationSchema={Yup.object({
        startDest: Yup.string().required("Required"),
        endDest: Yup.string().required("Required"),
        dateTime: Yup.string().required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form noValidate className={css.form}>
        <h1 className={css.header}>Wyszukaj przejazd już teraz!</h1>
        <MyTextInput
          label="Skąd"
          id="startDest"
          name="startDest"
          type="text"
          placeholder="Skąd"
          labelclass={css.label}
          inputclass={css.input}
          errorclass={css.error}
        />
        <MyTextInput
          label="Dokąd"
          id="endDest"
          name="endDest"
          type="text"
          placeholder="Dokąd"
          labelclass={css.label}
          inputclass={css.input}
          errorclass={css.error}
        />
        <MyTextInput
          label="Data i czas wyjazdu"
          id="dateTime"
          name="dateTime"
          type="text"
          placeholder=""
          labelclass={css.label}
          inputclass={css.input}
          errorclass={css.error}
        />
        <button type="submit" className={css.button}>
          Szukaj
        </button>
      </Form>
    </Formik>
  );
}
