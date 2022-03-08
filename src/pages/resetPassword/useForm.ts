import { useState } from "react";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import useValidation from "../../utils/hooks/useValidation";
import { updateData } from "../../utils/API/APIs";

const initialValues: any = {
  password: "",
  confirmPassword: "",
};

export const useForm = (token: any, validateOnChange = false) => {
  const { USERS, RESET_PASSWORD } = API_ENDPOINTS;
  const [values, setValues] = useState(initialValues);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [responseData, setResponseData] = useState({});
  const { validate, errors, setErrors } = useValidation(values);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });

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
        password: values.password,
        passwordConfirm: values.confirmPassword,
      };
      setIsLoading(true);
      
      await updateData(USERS + RESET_PASSWORD + "/" + token, requestBody)
        .then((response) => {
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
    handleInputChange,
    resetForm,
    handleSubmit,
    isLoading,
    alertOpen,
    setAlertOpen,
    responseMessage,
  };
};
