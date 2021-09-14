import { useState } from "react";
import { getData, addData, updateData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import useValidation from "../../utils/hooks/useValidation";

const initialValues: any = {
  firstName: "",
  lastName: "",
  username: "",
  data: "",
  role: "",
  password: "",
  confirmPassword: "",
};

export const useForm = (
  validateOnChange = false,
  setOpen: Function,
  setUpdate: Function
) => {
  const [values, setValues] = useState(initialValues);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { validate, errors, setErrors } = useValidation(values);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });

  const { USERS } = API_ENDPOINTS;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
    setUpdate(false);
    setAlertOpen(false);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  const getUserData = async (id: string) => {
    setIsLoading(true);
    await getData(USERS + "/" + id)
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        if (response && response.data && response.data.status === "success") {
          setValues({
            firstName: response.data.data.result.firstName,
            lastName: response.data.data.result.lastName,
            username: response.data.data.result.username,
            data: response.data.data.result.email
              ? response.data.data.result.email
              : response.data.data.result.phone,
            role: response.data.data.result.role,
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error", error);
      });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validate()) {
      let requestBody = {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        data: values.data,
        role: values.role,
        password: values.password,
        passwordConfirm: values.confirmPassword,
      };
      setIsLoading(true);
      console.log("requestBody", requestBody);
      await addData(USERS, requestBody)
        .then((response) => {
          console.log("data", response);
          setIsLoading(false);
          if (response && response.data && response.data.status === "success") {
            resetForm();
            setAlertOpen(true);
            setResponseMessage({
              status: response.data.status,
              message: response.data.message,
            });
          } else {
            setAlertOpen(true);
            setResponseMessage({
              status: "Error",
              message: response.message,
            });
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("Error log", error);
          setAlertOpen(true);
          setResponseMessage({
            status: "Error",
            message: error.message,
          });
        });
    }
  };

  const handleUpdateSubmit = async (e: any, id: string) => {
    e.preventDefault();
    if (validate()) {
      let requestBody = {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        data: values.data,
        role: values.role,
      };
      setIsLoading(true);
      console.log("requestBody", requestBody);
      await updateData(USERS + "/" + id, requestBody)
        .then((response) => {
          console.log("data", response);
          setIsLoading(false);
          if (response && response.data && response.data.status === "success") {
            resetForm();
            setAlertOpen(true);
            setResponseMessage({
              status: response.data.status,
              message: response.data.message,
            });
          } else {
            setAlertOpen(true);
            setResponseMessage({
              status: "Error",
              message: response.message,
            });
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("Error log", error);
          setAlertOpen(true);
          setResponseMessage({
            status: "Error",
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
    handleUpdateSubmit,
    handleClose,
    isLoading,
    setIsLoading,
    alertOpen,
    setAlertOpen,
    responseMessage,
    getUserData,
  };
};
