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

export const DateTimePicker = ({
  label,
  placeholder,
  labelclass,
  inputclass,
  errorclass,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  return (
    <>
      <label className={labelclass} htmlFor={props.id || props.name}>
        {label}
      </label>
      <DatePicker
        locale="pl"
        timeFormat="HH:mm"
        dateFormat="dd/MM/yyyy HH:mm"
        placeholderText={placeholder}
        showTimeSelect
        className={inputclass}
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
      />
      {meta.touched && meta.error ? (
        <div className={errorclass}>{meta.error}</div>
      ) : null}
    </>
  );
};

export const CustomSelect = ({
  label,
  labelclass,
  inputclass,
  errorclass,
  options,
  ...props
}) => {
  const [field, meta] = useField(props);

  let optionsList = [
    <option key="empty" value="" style={{ display: "none" }}></option>,
  ];
  options.forEach((element) => {
    optionsList.push(
      <option key={element.key} value={element.key}>
        {element.value}
      </option>
    );
  });

  return (
    <>
      <label className={labelclass} htmlFor={props.id || props.name}>
        {label}
      </label>
      <select className={inputclass} {...field} {...props}>
        {optionsList}
      </select>
      {meta.touched && meta.error ? (
        <div className={errorclass}>{meta.error}</div>
      ) : null}
    </>
  );
};
