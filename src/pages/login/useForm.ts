import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/authSlice";
import { addData } from "../../utils/API/API";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import useValidation from "../../utils/hooks/useValidation";

const initialValues: any = {
  data: "",
  password: "",
};

export const useForm = (validateOnChange = false) => {
  const [values, setValues] = useState(initialValues);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState({});
  const { validate, errors, setErrors } = useValidation(values);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });

  const { USERS, LOGIN } = API_ENDPOINTS;
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (responseMessage.status === "success") {
      dispatch(login(responseData));
    }
  }, [responseMessage]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validate()) {
      let requestBody = {
        data: values.data,
        password: values.password,
      };
      setIsLoading(true);
      console.log("requestBody", requestBody);
      await addData(USERS + LOGIN, requestBody)
        .then((response) => {
          console.log("data", response);
          setIsLoading(false);
          if (response.status === "success") {
            setAlertOpen(true);
            setResponseData(response);
            setResponseMessage({
              status: response.status,
              message: response.message,
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
          console.log("Error log", error);
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
    validate,
    handleSubmit,
    isLoading,
    alertOpen,
    setAlertOpen,
    responseMessage,
  };
};
