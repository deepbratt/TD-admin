import { useState } from "react";
import { addData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import useValidation from "../../utils/hooks/useValidation";

const initialValues: any = {
  data: "",
};

export const useForm = (validateOnChange = false) => {
  const [pin, setPin] = useState("");
  const [values, setValues] = useState(initialValues);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { validate, errors, setErrors } = useValidation(values);
  const [resetLinkMessage, setResetLinkMessage] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });
  const { USERS, FORGOT_PASSWORD } = API_ENDPOINTS;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validate()) {
      let requestBody = {
        data: values.data,
      };
      console.log("requestBody", requestBody);
      setIsLoading(true);
      await addData(USERS + FORGOT_PASSWORD, requestBody)
        .then((response) => {
          console.log("data", response);
          setIsLoading(false);
          if (response && response.data && response.data.status === "success") {
            setAlertOpen(true);
            setResponseMessage({
              status: response.data.status,
              message: response.data.message,
            });
          } else {
            setAlertOpen(true);
            setResponseMessage({
              status: "error",
              message: response.message,
            });
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setAlertOpen(true);
          setResponseMessage({
            status: error.status,
            message: error.message,
          });
        });
    }
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    pin,
    setPin,
    handleInputChange,
    resetForm,
    validate,
    handleSubmit,
    resetLinkMessage,
    setResetLinkMessage,
    alertOpen,
    setAlertOpen,
    responseMessage,
    isLoading,
  };
};
