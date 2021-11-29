import React from "react";
import { Formik, Form } from "formik";
import { MyTextInput } from "../components/FormComponents";
import * as Yup from "yup";
import useAuth from "../components/Auth";
import * as css from "../styles/signUp.module.scss";

export default function SignUp() {
  const { authed } = useAuth();

  return authed ? (
    <h2 className={css.h2}>Już jesteś zalogowany</h2>
  ) : (
    <>
      <h1 className={css.header}>Rejestracja</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          pwd: "",
          pwdRe: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string().required("Required"),
          pwd: Yup.string().required("Required"),
          pwdRe: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
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
            id="pwd"
            name="pwd"
            type="text"
            label="Hasło"
            placeholder="Hasło"
            labelclass={css.label}
            inputclass={css.input}
            errorclass={css.error}
          />
          <MyTextInput
            id="pwdRe"
            name="pwdRe"
            type="text"
            label="Powtórz hasło"
            placeholder="Powtórz hasło"
            labelclass={css.label}
            inputclass={css.input}
            errorclass={css.error}
          />
          <button type="submit" className={css.button}>
            Zarejestruj się
          </button>
        </Form>
      </Formik>
    </>
  );
}
