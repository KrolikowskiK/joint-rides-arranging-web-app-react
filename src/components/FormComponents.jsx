import { useField } from "formik";

export const MyTextInput = ({
  label,
  labelclass,
  inputclass,
  errorclass,
  ...props
}) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
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
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
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
