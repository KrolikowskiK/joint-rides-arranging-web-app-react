import React from "react";
import { Formik, Form } from "formik";
import { MyTextInput } from "../../services/FormComponents";
import * as Yup from "yup";
import useAuth from "../../services/Auth";
import * as css from "./signUp.module.scss";
import ky from "ky";
import { useLocation, useNavigate } from "react-router";

export default function SignUp() {
  const navigate = useNavigate();
  const { signin, token } = useAuth();
  const { state } = useLocation();

  return token ? (
    <h2 className={css.h2}>Już jesteś zalogowany</h2>
  ) : (
    <>
      <h1 className={css.header}>Rejestracja</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Podaj imię"),
          email: Yup.string()
            .email("Niewłaściwy format")
            .required("Podaj adres e-mail"),
          password: Yup.string()
            .min(6, ({ min }) => `Hasło powinno mieć co najmniej ${min} znaków`)
            .required("Podaj hasło"),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Podane hasła nie są takie same"
          ),
        })}
        onSubmit={async (values) => {
          try {
            const json = await ky
              .post(
                "https://travelapi-app.azurewebsites.net/api/Account/register",
                {
                  json: {
                    name: values.name,
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
            console.log(error);
            if (error.response.text) {
              error.response.text().then((errorMessage) => {
                console.log(errorMessage);
              });
            } else {
              console.log("Inny błąd");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <MyTextInput
              id="name"
              name="name"
              type="text"
              label="Imię"
              placeholder="Imię"
              labelclass={css.label}
              inputclass={css.input}
              errorclass={css.error}
            />
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
            <MyTextInput
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              label="Powtórz hasło"
              placeholder="Powtórz hasło"
              labelclass={css.label}
              inputclass={css.input}
              errorclass={css.error}
            />
            <button
              type="submit"
              className={css.submit}
              disabled={isSubmitting}
            >
              Zarejestruj się
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
