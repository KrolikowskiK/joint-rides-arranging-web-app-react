import React from "react";
import { Formik, Form } from "formik";
import { MyTextInput } from "../../services/FormComponents";
import * as Yup from "yup";
import * as css from "./styles/friendsSearchForm.module.scss";

export default function FriendsSearchForm() {
  return (
    <div className={css.searchForm}>
      <h1 className={css.header}>Wyszukaj znajomych</h1>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form noValidate className={css.form}>
          <MyTextInput
            id="name"
            name="name"
            type="text"
            placeholder="Imię"
            labelclass={css.label}
            inputclass={css.input}
            errorclass={css.error}
          />
          <button type="submit" className={css.button}>
            Szukaj
          </button>
        </Form>
      </Formik>
    </div>
  );
}
