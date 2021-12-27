import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import {
  MyTextInput,
  MyTextArea,
  CustomSelect,
} from "../../services/FormComponents";
import * as Yup from "yup";
import * as css from "./profile.module.scss";
import Opinion from "../Opinion/Opinion";
import useCustomKyApi from "../../hooks/KyApi";
import LoadingAnimation from "../../services/LoadingAnimation/LoadingAnimation";
import Popup from "../../services/Popup/Popup";

const Profile = () => {
  const api = useCustomKyApi();
  const [userDetails, setUserDetails] = useState(null);
  const [popup, setPopup] = useState(null);

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
        opinions: userDetails.member.opinions || [],
      });
    } catch (error) {
      setPopup(
        <Popup
          message="Nie udało się pobrać danych użytkownika"
          onAnimationEnd={() => {
            setPopup(null);
          }}
        />
      );
      setUserDetails({
        id: "",
        userHash: "",
        email: "",
        name: "",
        gender: "",
        description: "",
        opinions: [],
      });
    }
  }, []);

  return userDetails === null ? (
    <LoadingAnimation />
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
              await api.patch(
                "https://travelapi-app.azurewebsites.net/api/Users",
                {
                  json: {
                    name: values.name,
                    email: values.email,
                    password: values.newPassword,
                    description: values.description,
                    gender: values.gender,
                  },
                }
              );
              setPopup(
                <Popup
                  message="Zapisano zmiany"
                  onAnimationEnd={() => {
                    setPopup(null);
                  }}
                />
              );
            } catch (error) {
              setPopup(
                <Popup
                  message="Nie udało się zapisać zmian"
                  onAnimationEnd={() => {
                    setPopup(null);
                  }}
                />
              );
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
      {popup}
    </div>
  );
};

export default Profile;
