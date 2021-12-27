import React, { useState } from "react";
import { Formik, Form } from "formik";
import { MyTextInput } from "../../services/FormComponents";
import * as Yup from "yup";
import useAuth from "../../services/Auth";
import { useLocation, useNavigate } from "react-router";
import * as css from "./signIn.module.scss";
import ky from "ky";

export default function SignIn() {
  const navigate = useNavigate();
  const { signin, token } = useAuth();
  const { state } = useLocation();
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  return token ? (
    <h2 className={css.h2}>Już jesteś zalogowany</h2>
  ) : (
    <>
      <h1 className={css.header}>Logowanie</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Niewłaściwy format")
            .required("Podaj adres e-mail"),
          // .test("validEmail", validationErrors.email, async () => {
          //   return validationErrors.email === "" ? true : false;
          // }),
          password: Yup.string()
            .min(6, ({ min }) => `Hasło powinno mieć co najmniej ${min} znaków`)
            .required("Podaj hasło"),
          // .test("validPassword", validationErrors.password, async () => {
          //   return validationErrors.password === "" ? true : false;
          // }),
        })}
        onSubmit={async (values) => {
          try {
            const json = await ky
              .post(
                "https://travelapi-app.azurewebsites.net/api/Account/login",
                {
                  json: {
                    email: values.email,
                    password: values.password,
                  },
                }
              )
              .json();

            signin({ token: json.token }).then(() => {
              const path = state === null ? "/" : state.path;
              navigate(path);
            });
          } catch (error) {
            if (error.response && error.response.text) {
              error.response.text().then((errorMessage) => {
                console.log(errorMessage);
                // const { type, error: fieldError } = JSON.parse(errorMessage);
                // const errorsObject = {
                //   email: type === "Email" ? fieldError : "",
                //   password: type === "Password" ? fieldError : "",
                // };
                // setValidationErrors(errorsObject);
                // console.log(validationErrors);
              });
            } else {
              console.log("Inny błąd: ", error);
            }
          }
        }}
      >
        {({ isSubmitting }) => (
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
              id="password"
              name="password"
              type="password"
              label="Hasło"
              placeholder="Hasło"
              labelclass={css.label}
              inputclass={css.input}
              errorclass={css.error}
            />
            <button
              type="submit"
              className={css.submit}
              disabled={isSubmitting}
            >
              Zaloguj się
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
