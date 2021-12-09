import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
registerLocale("pl", pl);

export const MyTextInput = ({
  label,
  labelclass,
  inputclass,
  errorclass,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className={labelclass} htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className={inputclass} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={errorclass}>{meta.error}</div>
      ) : null}
    </>
  );
};

export const MyTextArea = ({
  label,
  labelclass,
  inputclass,
  errorclass,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className={labelclass} htmlFor={props.id || props.name}>
        {label}
      </label>
      <textarea className={inputclass} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={errorclass}>{meta.error}</div>
      ) : null}
    </>
  );
};

export const DateTimePicker = ({ label, labelclass, inputclass, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <>
      <label className={labelclass} htmlFor={props.id || props.name}>
        {label}
      </label>
      <DatePicker
        locale="pl"
        timeFormat="HH:mm"
        dateFormat="dd/MM/yyyy HH:mm"
        showTimeSelect
        className={inputclass}
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          console.log(val);
          setFieldValue(field.name, val);
        }}
      />
    </>
  );
};

export const CustomSelect = ({
  label,
  labelclass,
  inputclass,
  errorclass,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className={labelclass} htmlFor={props.id || props.name}>
        {label}
      </label>
      <select className={inputclass} {...field} {...props}>
        <option value="" style={{ display: "none" }}></option>
        <option value="men">Mężczyzna</option>
        <option value="women">Kobieta</option>
      </select>
      {meta.touched && meta.error ? (
        <div className={errorclass}>{meta.error}</div>
      ) : null}
    </>
  );
};
