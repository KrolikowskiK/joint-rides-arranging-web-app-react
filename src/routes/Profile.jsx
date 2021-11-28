import React from "react";
import { Formik, Form } from "formik";
import { MyTextInput, MyTextArea } from "../components/FormComponents";
import * as Yup from "yup";
import * as css from "../styles/profile.module.scss";
const avatar = new URL("../svgs/avatar.svg", import.meta.url);

export default function Profile() {
  return (
    <div className={css.profile}>
      <h1 className={css.mainHeader}>Twój profil</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          myDescription: "",
          oldPwd: "",
          newPwd: "",
          newPwdRe: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string().required("Required"),
          myDescription: Yup.string().required("Required"),
          oldPwd: Yup.string().required("Required"),
          newPwd: Yup.string().required("Required"),
          newPwdRe: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form noValidate className={css.form}>
          <div className={css.left}>
            <object
              data={avatar}
              width="250"
              height="250"
              title="avatar"
            ></object>
            <MyTextArea
              label="Twój opis"
              id="myDescription"
              name="myDescription"
              placeholder="Krótki opis twojej osoby"
              labelclass={css.label}
              inputclass={css.textArea}
              errorclass={css.error}
            />
          </div>

          <div className={css.right}>
            <h2 className={css.secondaryHeader}>Zmień dane osobowe</h2>
            <MyTextInput
              label="Imię"
              id="name"
              name="name"
              type="text"
              placeholder="Imię"
              labelclass={css.label}
              inputclass={css.input}
              errorclass={css.error}
            />
            <h2 className={css.secondaryHeader}>Zmień adres e-mail</h2>
            <MyTextInput
              label="E-mail"
              id="email"
              name="email"
              type="text"
              placeholder="E-mail"
              labelclass={css.label}
              inputclass={css.input}
              errorclass={css.error}
            />
            <h2 className={css.secondaryHeader}>Zmień hasło</h2>
            <MyTextInput
              label="Stare hasło"
              id="oldPwd"
              name="oldPwd"
              type="text"
              placeholder="Stare hasło"
              labelclass={css.label}
              inputclass={css.input}
              errorclass={css.error}
            />
            <MyTextInput
              label="Nowe hasło"
              id="newPwd"
              name="newPwd"
              type="text"
              placeholder="Nowe hasło"
              labelclass={css.label}
              inputclass={css.input}
              errorclass={css.error}
            />
            <MyTextInput
              label="Powtórz nowe hasło"
              id="newPwdRe"
              name="newPwdRe"
              type="text"
              placeholder="Powtórz nowe hasło"
              labelclass={css.label}
              inputclass={css.input}
              errorclass={css.error}
            />
            <button className={css.button} type="submit">
              Zapisz
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
