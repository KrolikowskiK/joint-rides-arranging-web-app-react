import { Formik, Form } from "formik";
import { MyTextInput } from "../components/FormComponents";
import * as Yup from "yup";
import * as css from "../styles/carAdd.module.scss";

export default function CarAdd() {
  return (
    <>
      <h1 className={css.header}>Nowy samochód</h1>
      <Formik
        initialValues={{
          mark: "",
          model: "",
          registrationNumber: "",
          numberOfSeats: "",
          color: "",
        }}
        validationSchema={Yup.object({
          mark: Yup.string().required("Required"),
          model: Yup.string().required("Required"),
          registrationNumber: Yup.string().required("Required"),
          numberOfSeats: Yup.string().required("Required"),
          color: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form noValidate className={css.form}>
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
          <button className={css.button} type="submit">
            Dodaj pojazd
          </button>
        </Form>
      </Formik>
    </>
  );
}
