/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import "./FormInput.css";
const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, validation, value, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  const handleBlur = (e) => {
    setFocused(false);
  }

  return (
    <div className="p-2 border-rounded-2">
      <label className="fs-4 fw-bold">{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => inputProps.name === "" || setFocused(true)}
        focused={focused.toString()}
        className={`form-control  black-border ${focused && validation(value) ? 'invalid': ''}`}
      />
      {focused && validation(value) && <span>{errorMessage}</span>}
    </div>
  );
};
export default FormInput;
