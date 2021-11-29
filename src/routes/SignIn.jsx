import React from "react";
import { Formik, Form } from "formik";
import { MyTextInput } from "../components/FormComponents";
import * as Yup from "yup";
import useAuth from "../components/Auth";
import { useLocation, useNavigate } from "react-router";
import * as css from "../styles/signIn.module.scss";

export default function SignIn() {
  const navigate = useNavigate();
  const { signin, authed } = useAuth();
  const { state } = useLocation();

  return authed ? (
    <h2 className={css.h2}>Już jesteś zalogowany</h2>
  ) : (
    <>
      <h1 className={css.header}>Logowanie</h1>
      <Formik
        initialValues={{
          email: "",
          pwd: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().required("Required"),
          pwd: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            signin().then(() => {
              const path = state === null ? "/" : state.path;
              navigate(path);
            });
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form noValidate className={css.form}>
          <MyTextInput
            id="email"
            name="email"
            type="text"
            label="E-mail"
            placeholder="E-mail"
            labelclass={css.label}
            inputclass={css.input}
            errorclass={css.error}
          />
          <MyTextInput
            id="pwd"
            name="pwd"
            type="text"
            label="Hasło"
            placeholder="Hasło"
            labelclass={css.label}
            inputclass={css.input}
            errorclass={css.error}
          />
          <button type="submit" className={css.button}>
            Zaloguj się
          </button>
        </Form>
      </Formik>
    </>
  );
}
