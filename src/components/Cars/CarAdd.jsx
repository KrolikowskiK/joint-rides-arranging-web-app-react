import { Formik, Form } from "formik";
import { MyTextInput } from "../../services/FormComponents";
import * as Yup from "yup";
import * as css from "./styles/carAdd.module.scss";
import { useNavigate } from "react-router";
import useCustomKyApi from "../../hooks/KyApi";

const CarAdd = () => {
  const navigate = useNavigate();
  const api = useCustomKyApi();

  return (
    <>
      <h1 className={css.header}>Nowy samochód</h1>
      <Formik
        initialValues={{
          mark: "",
          model: "",
          registrationNumber: "",
          productionYear: "",
          numberOfSeats: "",
          color: "",
        }}
        validationSchema={Yup.object({
          mark: Yup.string().required("Podaj markę samochodu"),
          model: Yup.string().required("Podaj model samochodu"),
          registrationNumber: Yup.string().required(
            "Podaj numer rejestracyjny samochodu"
          ),
          //   TODO check if productionYear is 4 characters
          productionYear: Yup.number()
            .typeError("Podaj liczbę")
            .integer("Podaj liczbę całkowitą")
            .required("Podaj rok produkcji samochodu"),
          numberOfSeats: Yup.number()
            .typeError("Podaj liczbę")
            .integer("Podaj liczbę całkowitą")
            .required("Podaj liczbę siedzeń w samochodzie"),
          color: Yup.string().required("Podaj kolor samochodu twojego starego"),
        })}
        onSubmit={async (values) => {
          try {
            await api.post(
              "https://travelapi-app.azurewebsites.net/api/Cars/AddCar",
              {
                json: {
                  mark: values.mark,
                  model: values.model,
                  registrationNumber: values.registrationNumber,
                  productionYear: values.productionYear,
                  numberOfSeats: values.numberOfSeats,
                  color: values.color,
                },
              }
            );

            navigate("/cars");
          } catch (error) {
            if (error.response && error.response.text) {
              error.response.text().then((errorMessage) => {
                console.log(errorMessage);
              });
            } else {
              console.log("Inny błąd: ", error);
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form noValidate className={css.form}>
            <div className={css.fields}>
              <div className={css.mark}>
                <MyTextInput
                  id="mark"
                  name="mark"
                  type="text"
                  label="Marka"
                  placeholder="Marka"
                  labelclass={css.label}
                  inputclass={css.input}
                  errorclass={css.error}
                />
              </div>
              <div className={css.model}>
                <MyTextInput
                  id="model"
                  name="model"
                  type="text"
                  label="Model"
                  placeholder="Model"
                  labelclass={css.label}
                  inputclass={css.input}
                  errorclass={css.error}
                />
              </div>
              <div className={css.productionYear}>
                <MyTextInput
                  id="productionYear"
                  name="productionYear"
                  type="text"
                  label="Rok produkcji"
                  placeholder="Rok produkcji"
                  labelclass={css.label}
                  inputclass={css.input}
                  errorclass={css.error}
                />
              </div>
              <div className={css.registrationNumber}>
                <MyTextInput
                  id="registrationNumber"
                  name="registrationNumber"
                  type="text"
                  label="Numer rejestracyjny"
                  placeholder="Numer rejestracyjny"
                  labelclass={css.label}
                  inputclass={css.input}
                  errorclass={css.error}
                />
              </div>
              <div className={css.numberOfSeats}>
                <MyTextInput
                  id="numberOfSeats"
                  name="numberOfSeats"
                  type="text"
                  label="Liczba siedzeń"
                  placeholder="Liczba siedzeń"
                  labelclass={css.label}
                  inputclass={css.input}
                  errorclass={css.error}
                />
              </div>
              <div className={css.color}>
                <MyTextInput
                  id="color"
                  name="color"
                  type="text"
                  label="Kolor"
                  placeholder="Kolor"
                  labelclass={css.label}
                  inputclass={css.input}
                  errorclass={css.error}
                />
              </div>
            </div>
            <div className={css.buttons}>
              <button
                className={css.submit}
                type="submit"
                disabled={isSubmitting}
              >
                Dodaj pojazd
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CarAdd;
