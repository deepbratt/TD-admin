import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/authSlice";
import { addData } from "../../utils/API/APIs";
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
      console.log("responseData", responseData);
      console.log("[useForm]", responseData);
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
          if (response && response.data && response.data.status === "success") {
            setAlertOpen(true);
            setResponseData(response.data);
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
          setIsLoading(false)
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
