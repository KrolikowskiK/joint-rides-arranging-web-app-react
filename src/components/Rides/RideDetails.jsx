import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import * as css from "./styles/rideDetails.module.scss";
import useCustomKyApi from "../../hooks/KyApi";
import useAuth from "../../services/Auth";
import { Form, Formik } from "formik";
import { formatDate } from "../../services/utils";
import { MyTextInput } from "../../services/FormComponents";
import Popup from "../../services/Popup/Popup";
import * as Yup from "yup";

const RideDetails = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { rideId } = useParams();
  const api = useCustomKyApi();
  const [rideDetails, setRideDetails] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isPassenger, setIsPassenger] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [popup, setPopup] = useState(null);

  useEffect(async () => {
    try {
      const ride = await api
        .get(`https://travelapi-app.azurewebsites.net/api/Trips/${rideId}`)
        .json();

      let owner, passenger;
      // Check if owner
      if (parseInt(ride.creator.id) === parseInt(userId)) {
        owner = true;
        setIsOwner(true);
      }

      // Check if passenger
      ride.passenger.forEach((element) => {
        if (parseInt(element.id) === parseInt(userId)) {
          passenger = true;
          setIsPassenger(true);
        }
      });

      if (owner || passenger) {
        const rawMessages = await api
          .get(
            `https://travelapi-app.azurewebsites.net/api/Trips/Messages/${rideId}`
          )
          .json();
        const formattedMessages = rawMessages.map((message, key) => {
          return (
            <div key={key} className={css.message}>
              <div className={css.user}>{message.owner.name}</div>
              <div className={css.date}>{formatDate(message.addedDate)}</div>
              <div className={css.text}>{message.textMessage}</div>
            </div>
          );
        });
        setMessages(formattedMessages);
      }

      // Populate passengers array
      setPassengers(
        ride.passenger.map((passenger) => {
          return (
            <div key={passenger.id} className={css.passenger}>
              {passenger.name}
            </div>
          );
        })
      );

      setRideDetails({
        startDest: ride.startFrom,
        endDest: ride.endIn,
        startDateAndTime: formatDate(ride.startTime),
        driver: ride.creator.name,
        driverHash: ride.creator.userHash,
        price: ride.price,
        availableSeats: ride.numberOfSeats,
        carName: ride.car.mark + " " + ride.car.model,
        carColor: ride.car.color,
        carRegistrationNumber: ride.car.registrationNumber,
        passengers: ride.passenger,
      });
    } catch (error) {
      if (error.response && error.response.text) {
        error.response.text().then((errorMessage) => {
          console.log(errorMessage);
        });
      } else {
        console.log("Inny błąd: ", error);
      }
    }
  }, []);

  const joinRide = async () => {
    try {
      await api.post(
        `https://travelapi-app.azurewebsites.net/api/Trips/addPassenger`,
        {
          json: {
            userId: userId,
            tripId: rideId,
          },
        }
      );
    } catch (error) {
      if (error.response && error.response.text) {
        error.response.text().then((errorMessage) => {
          console.log(errorMessage);
        });
      } else {
        console.log("Inny błąd: ", error);
      }
    }
  };

  const leftRide = async () => {
    try {
      await api.delete(
        `https://travelapi-app.azurewebsites.net/api/Trips/deletePassenger`,
        {
          json: {
            userId: userId,
            tripId: rideId,
          },
        }
      );
    } catch (error) {
      if (error.response && error.response.text) {
        error.response.text().then((errorMessage) => {
          console.log(errorMessage);
        });
      } else {
        console.log("Inny błąd: ", error);
      }
    }
    navigate("/rides");
  };

  const deleteRide = async () => {
    try {
      await api.delete(
        `https://travelapi-app.azurewebsites.net/api/Trips/deleteTrip/${rideId}`
      );
    } catch (error) {
      if (error.response && error.response.text) {
        error.response.text().then((errorMessage) => {
          console.log(errorMessage);
        });
      } else {
        console.log("Inny błąd: ", error);
      }
    }
    navigate("/rides");
  };

  return rideDetails === null ? (
    <h2>Ładowanie szczegółów przejazdu</h2>
  ) : (
    <div className={css.ride}>
      <h2 className={css.header}>Szczegóły przejazdu</h2>
      <div className={css.rideDetails}>
        <div className={css.startDest}>
          <div className={css.label}>Miejsce początkowe:</div>
          <div className={css.value}>{rideDetails.startDest}</div>
        </div>
        <div className={css.endDest}>
          <div className={css.label}>Miejsce docelowe:</div>
          <div className={css.value}>{rideDetails.endDest}</div>
        </div>
        <div className={css.startDateAndTime}>
          <div className={css.label}>Data i czas wyjazdu:</div>
          <div className={css.value}>{rideDetails.startDateAndTime}</div>
        </div>
        {!isOwner ? (
          <div className={css.driver}>
            <div className={css.label}>Kierowca:</div>
            <div className={css.value}>
              <Link to={`/profile/${rideDetails.driverHash}`}>
                {rideDetails.driver}
              </Link>
            </div>
          </div>
        ) : null}
        <div className={css.price}>
          <div className={css.label}>Cena:</div>
          <div className={css.value}>{rideDetails.price} zł</div>
        </div>
        <div className={css.availableSeats}>
          <div className={css.label}>Dostępne miejsca:</div>
          <div className={css.value}>{rideDetails.availableSeats}</div>
        </div>
        <div className={css.carName}>
          <div className={css.label}>Nazwa samochodu:</div>
          <div className={css.value}>{rideDetails.carName}</div>
        </div>
        {isPassenger ? (
          <div className={css.carColor}>
            <div className={css.label}>Kolor samochodu:</div>
            <div className={css.value}>{rideDetails.carColor}</div>
          </div>
        ) : null}
        {isPassenger ? (
          <div className={css.carRegistrationNumber}>
            <div className={css.label}>Numer rejestracyjny samochodu:</div>
            <div className={css.value}>{rideDetails.carRegistrationNumber}</div>
          </div>
        ) : null}
      </div>

      {passengers.length > 0 && (
        <>
          <h2 className={css.header}>Pasażerowie</h2>
          <div className={css.passengers}>{passengers}</div>
        </>
      )}

      <div className={css.buttons}>
        {/* if not already in */}
        {isPassenger === false && isOwner === false ? (
          <button className={css.button} onClick={joinRide}>
            Dołącz do przejazdu
          </button>
        ) : null}
        {/* if not the owner and already in*/}
        {isPassenger === true && isOwner === false ? (
          <button className={css.button} onClick={leftRide}>
            Opuść przejazd
          </button>
        ) : null}
        {/* only owner */}
        {isOwner ? (
          <>
            <button className={css.button} onClick={deleteRide}>
              Usuń przejazd
            </button>
            <Link to="edit" className={css.button}>
              Edytuj przejazd
            </Link>
          </>
        ) : null}
      </div>

      {/* only if in ride */}
      {isPassenger || isOwner ? (
        <>
          <h2 className={css.header}>Czat</h2>
          <div className={css.chat}>
            <div className={css.messages}>
              {messages.length > 0 ? (
                messages
              ) : (
                <h3 className={css.header}>Brak wiadomości</h3>
              )}
            </div>
            <Formik
              initialValues={{ message: "" }}
              validationSchema={Yup.object({
                message: Yup.string().required("Podaj treść wiadomości"),
              })}
              onSubmit={async (values) => {
                try {
                  await api.post(
                    `https://travelapi-app.azurewebsites.net/api/Trips/Messages/AddMessage`,
                    {
                      json: {
                        tripId: rideId,
                        textMessage: values.message,
                      },
                    }
                  );
                } catch (error) {
                  console.log(error);
                  setPopup(
                    <Popup
                      message="Nie udało się wysłać wiadomości"
                      onAnimationEnd={() => {
                        setPopup(null);
                      }}
                    />
                  );
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className={css.writeMessage}>
                  <MyTextInput
                    id="message"
                    name="message"
                    type="text"
                    label=""
                    placeholder="Treść wiadomości"
                    labelclass={css.label}
                    inputclass={css.input}
                    errorclass={css.error}
                  />
                  <button
                    className={css.button}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Wyślij wiadomość
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </>
      ) : null}
      {popup}
    </div>
  );
};

export default RideDetails;
