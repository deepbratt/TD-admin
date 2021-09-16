import { useState } from "react";
import { fieldNames, messages } from "../constants/formsConstants";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateConfirmPassword,
  validateData,
  validateRole,
} from "../functions/validations";

const useValidation = (values: any) => {
  const [errors, setErrors] = useState(values);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if(fieldNames.role in fieldValues){
      temp.role = validateRole(fieldValues.role)
    }

    if (fieldNames.email in fieldValues) {
      temp.email = validateEmail(fieldValues.email);
    }
    if (fieldNames.firstName in fieldValues) {
      temp.firstName = validateName(fieldValues.firstName);
    }
    if (fieldNames.lastName in fieldValues) {
      temp.lastName = validateName(fieldValues.lastName);
    }
    if (fieldNames.mobile in fieldValues) {
      temp.mobile = validatePhone(fieldValues.mobile);
    }
    if (fieldNames.data in fieldValues) {
      temp.data = validateData(fieldValues.data);
    }
    if (fieldNames.username in fieldValues) {
      temp.username =
        fieldValues.username.trim() === "" ? messages.isRequired : "";
    }
    if (fieldNames.password in fieldValues) {
      temp.password = validatePassword(fieldValues.password);
    }
    if (fieldNames.confirmPassword in fieldValues) {
      temp.confirmPassword = validateConfirmPassword(
        fieldValues.confirmPassword,
        fieldValues.password
      );
    }

    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  return {
    validate,
    errors,
    setErrors,
  };
};

export default useValidation;
