import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingAnimation from "../../services/LoadingAnimation/LoadingAnimation";
import useCustomKyApi from "../../hooks/KyApi";
import * as css from "./profileGuest.module.scss";
import Opinion from "../Opinion/Opinion";

const ProfileGuest = () => {
  const { userHash } = useParams();
  const api = useCustomKyApi();
  const [userDetails, setUserDetails] = useState();

  useEffect(async () => {
    try {
      const user = await api
        .get(
          `https://travelapi-app.azurewebsites.net/api/Users/user/${userHash}`
        )
        .json();

      setUserDetails({
        name: user.name,
        gender: user.gender === "men" ? "Mężczyzna" : "Kobieta",
        description: user.description || "Brak opisu",
        opinions: [],
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
          <h2>Opinie</h2>
          <Opinion />
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
    </div>
  );
};

export default ProfileGuest;
