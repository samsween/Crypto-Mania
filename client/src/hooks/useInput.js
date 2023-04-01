import { useState } from "react";

export const useInput = (initialValue, validate = null) => {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState([]);

  const onChange = (e) => {
    if (typeof validate === "function") {
      if (e.target.value === "") {
        setErrors([]);
        return;
      }
      const isValid = validate(e.target.value);
      console.log(isValid);
      if (isValid.length > 0) {
        setErrors(isValid);
        return;
      }
      setErrors([]);
      setValue(e.target.value);
    } else {
      setValue(e.target.value);
    }
  };

  return {
    value,
    setValue,
    onChange,
    errors,
  };
};
