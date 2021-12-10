import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import {
  MyTextInput,
  MyTextArea,
  CustomSelect,
} from "../components/FormComponents";
import * as Yup from "yup";
import * as css from "../styles/profile.module.scss";
import Opinion from "../components/Opinion";
import useCustomKyApi from "../components/KyApi";

const Profile = () => {
  const api = useCustomKyApi();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(async () => {
    try {
      const userDetails = await api
        .get("https://travelapi-app.azurewebsites.net/api/Users/user")
        .json();
      setUserDetails({
        id: userDetails.member.id || "",
        userHash: userDetails.member.userHash || "",
        email: userDetails.email || "",
        name: userDetails.member.name || "",
        gender: userDetails.member.gender || "",
        description: userDetails.member.description || "",
        opinions: userDetails.member.opinions || "",
      });
    } catch (error) {
      if (error.response && error.response.text) {
        error.response.text().then((errorMessage) => {
          console.log(errorMessage);
        });
      } else {
        console.log("Inny błąd: ", error);
      }
      setUserDetails({
        id: "",
        userHash: "",
        email: "",
        name: "",
        gender: "",
        description: "",
        opinions: "",
      });
    }
  }, []);

  return userDetails === null ? (
    <h2>Ładowanie</h2>
  ) : (
    <div className={css.profile}>
      <h1 className={css.mainHeader}>Twój profil</h1>
      <div className={css.content}>
        <div className={css.opinions}>
          <h2>Twoje opinie</h2>
          <Opinion />
        </div>
        <Formik
          initialValues={{
            name: userDetails.name,
            email: userDetails.email,
            description: userDetails.description,
            gender: userDetails.gender,
            currentPassword: "",
            newPassword: "",
            newPasswordConfirmation: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Podaj imię"),
            email: Yup.string()
              .email("Niewłaściwy format")
              .required("Podaj adres e-mail"),
            description: Yup.string(),
            gender: Yup.string(),
            currentPassword: Yup.string().min(
              6,
              ({ min }) => `Hasło powinno mieć co najmniej ${min} znaków`
            ),
            newPassword: Yup.string().min(
              6,
              ({ min }) => `Hasło powinno mieć co najmniej ${min} znaków`
            ),
            newPasswordConfirmation: Yup.string().oneOf(
              [Yup.ref("newPassword"), null],
              "Podane hasła nie są takie same"
            ),
          })}
          onSubmit={async (values) => {
            try {
              const response = await api
                .patch("https://travelapi-app.azurewebsites.net/api/Users", {
                  json: {
                    name: values.name,
                    email: values.email,
                    // password: values.password,
                    description: values.description,
                    gender: values.gender,
                  },
                })
                .json();
              console.log(response);
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
            <Form noValidate className={css.form}>
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
              <CustomSelect
                label="Płeć"
                id="gender"
                name="gender"
                options={[
                  { key: "men", value: "Mężczyzna" },
                  { key: "women", value: "Kobieta" },
                ]}
                labelclass={css.label}
                inputclass={css.input}
                errorclass={css.error}
              />
              <MyTextArea
                label="Twój opis"
                id="description"
                name="description"
                placeholder="Krótki opis twojej osoby"
                labelclass={css.label}
                inputclass={css.textArea}
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
                label="Obecne hasło"
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="Obecne hasło"
                labelclass={css.label}
                inputclass={css.input}
                errorclass={css.error}
              />
              <MyTextInput
                label="Nowe hasło"
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Nowe hasło"
                labelclass={css.label}
                inputclass={css.input}
                errorclass={css.error}
              />
              <MyTextInput
                label="Powtórz nowe hasło"
                id="newPasswordConfirmation"
                name="newPasswordConfirmation"
                type="password"
                placeholder="Powtórz nowe hasło"
                labelclass={css.label}
                inputclass={css.input}
                errorclass={css.error}
              />
              <button
                className={css.button}
                type="submit"
                disabled={isSubmitting}
              >
                Zapisz
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
