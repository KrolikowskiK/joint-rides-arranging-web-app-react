import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingAnimation from "../../services/LoadingAnimation/LoadingAnimation";
import useCustomKyApi from "../../hooks/KyApi";
import * as css from "./styles/profileGuest.module.scss";
import Opinion from "../Opinion/Opinion";
import { formatDate } from "../../services/utils";
import { Form, Formik } from "formik";
import { CustomSelect, MyTextArea } from "../../services/FormComponents";
import * as Yup from "yup";
import Popup from "../../services/Popup/Popup";

const ProfileGuest = () => {
  const { userHash } = useParams();
  const api = useCustomKyApi();
  const [userDetails, setUserDetails] = useState();
  const [popup, setPopup] = useState(null);

  useEffect(async () => {
    try {
      const user = await api
        .get(
          `https://travelapi-app.azurewebsites.net/api/Users/user/${userHash}`
        )
        .json();

      const opinions = user.opinions.map((opinion) => (
        <Opinion
          key={opinion.id}
          rate={opinion.opinionValue}
          date={formatDate(opinion.date)}
          text={opinion.opinionDescription}
        />
      ));

      setUserDetails({
        id: user.id,
        name: user.name,
        gender: user.gender === "men" ? "Mężczyzna" : "Kobieta",
        description: user.description || "Brak opisu",
        opinions: opinions,
      });
    } catch (error) {
      setUserDetails(null);
    }
  }, []);

  return userDetails === undefined ? (
    <LoadingAnimation />
  ) : userDetails === null ? (
    <h2>Nie udało się pobrać danych użytkownika</h2>
  ) : (
    <div className={css.profile}>
      <h1 className={css.mainHeader}>Profil użytkownika</h1>
      <div className={css.content}>
        <div className={css.opinions}>
          <h2>
            {userDetails.opinions.length > 0
              ? "Opinie"
              : "Brak opinii do wyświetlenia"}
          </h2>
          {userDetails.opinions}
          <h2>Dodaj opinię</h2>
          <Formik
            initialValues={{ rate: "", opinion: "" }}
            validationSchema={Yup.object({
              rate: Yup.string().required("Wybierz ocenę"),
              opinion: Yup.string().required("Napisz opinię"),
            })}
            onSubmit={async (values) => {
              try {
                await api.post(
                  "https://travelapi-app.azurewebsites.net/api/Opinion/addOpinion",
                  {
                    json: {
                      userId: userDetails.id,
                      opinionValue: values.rate,
                      opinionDescription: values.opinion,
                    },
                  }
                );

                setPopup(
                  <Popup
                    message="Dodano opinię"
                    onAnimationEnd={() => {
                      setPopup(null);
                    }}
                  />
                );
              } catch (error) {
                setPopup(
                  <Popup
                    message="Nie udało się dodać opinii"
                    onAnimationEnd={() => {
                      setPopup(null);
                    }}
                  />
                );
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className={css.form}>
                <CustomSelect
                  label="Ocena"
                  id="rate"
                  name="rate"
                  options={[
                    { key: "1", value: "1" },
                    { key: "2", value: "2" },
                    { key: "3", value: "3" },
                    { key: "4", value: "4" },
                    { key: "5", value: "5" },
                  ]}
                  labelclass={css.formLabel}
                  inputclass={css.input}
                  errorclass={css.error}
                />
                <MyTextArea
                  label="Treść opinii"
                  id="opinion"
                  name="opinion"
                  placeholder="Treść opinii"
                  labelclass={css.formLabel}
                  inputclass={css.textArea}
                  errorclass={css.error}
                />
                <button
                  type="submit"
                  className={css.button}
                  disabled={isSubmitting}
                >
                  Wyślij
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className={css.details}>
          <h2 className={css.secondaryHeader}>Dane osobowe</h2>

          <div className={css.name}>
            <div className={css.label}>Imię:</div>
            <div className={css.value}>{userDetails.name}</div>
          </div>

          <div className={css.gender}>
            <div className={css.label}>Płeć:</div>
            <div className={css.value}>{userDetails.gender}</div>
          </div>

          <div className={css.description}>
            <div className={css.label}>Opis:</div>
            <div className={css.value}>{userDetails.description}</div>
          </div>
        </div>
      </div>
      {popup}
    </div>
  );
};

export default ProfileGuest;
