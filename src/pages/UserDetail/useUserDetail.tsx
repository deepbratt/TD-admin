import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import { getData, updateData, updateFormData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const initialValueReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const initialFieldValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  image: "",
  userName: "",
  newPassword: "",
  currentPassword: "",
  confirmPassword: "",
  joined: "",
  signedUpWithEmail: false,
  signedUpWithPhone: true,
  id: "",
};

const useUserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useReducer(formReducer, initialFieldValues);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [initialValues, setInitialValues] = useReducer(initialValueReducer, {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: "",
    userName: "",
    newPassword: "",
    confirmPassword: "",
    currentPassword: "",
    joined: "",
    signedUpWithEmail: false,
    signedUpWithPhone: true,
    about: "",
    description: "",
    bannerImage: "",
    id: "",
  });

  // functions
  const handleChange = (event: any) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleImageChange = (event: any) => {
    setFormData({
      name: event.target.name,
      value: event.target.files[0],
    });
    event.target.value = null;
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value[0] !== "0" && value[0] !== "+" && value.length <= 10) {
      let newData = formData;
      newData.phone = value;
      setFormData(newData);
    }
  };

  const resetUserInformation = () => {
    setFormData({ name: "firstName", value: initialValues.firstName });
    setFormData({ name: "lastName", value: initialValues.lastName });
    setFormData({ name: "phone", value: initialValues.phone });
    setFormData({ name: "email", value: initialValues.email });
  };

  const resetImage = () => {
    setFormData({ name: "image", value: initialValues.image });
  };

  const resetUserAboutInformation = () => {
    setFormData({ name: "about", value: initialValues.about });
    setFormData({ name: "description", value: initialValues.description });
  };

  const resetBannerImage = () => {
    setFormData({ name: "bannerImage", value: initialValues.bannerImage });
  };
  const resetPasswordInformation = () => {
    setFormData({ name: "newPassword", value: "" });
    setFormData({ name: "confirmPassword", value: "" });
    setFormData({ name: "currentPassword", value: "" });
  };

  const updateImage = () => {
    setIsLoading(true);
    let fd = new FormData();
    fd.append("image", formData.image);
    updateUserInformation(fd);
  };

  const updateBannerImage = () => {
    setIsLoading(true);
    let fd = new FormData();
    fd.append("bannerImage", formData.bannerImage);
    updateUserInformation(fd);
  };

  const updateUser = () => {
    let fd = new FormData();
    let changed = false;
    if (formData.firstName !== initialValues.firstName) {
      fd.append("firstName", formData.firstName);
      changed = true;
    }
    if (formData.lastName !== initialValues.lastName) {
      fd.append("lastName", formData.lastName);
      changed = true;
    }
    if (formData.phone !== initialValues.phone && !formData.signedUpWithPhone) {
      fd.append("phone", "+92" + formData.phone);
      changed = true;
    }
    if (formData.email !== initialValues.email && !formData.signedUpWithEmail) {
      fd.append("email", formData.email);
      changed = true;
    }
    if (!changed) {
      setToastMessage("Nothing to update");
      setToastType("error");
      setToastOpen(true);
      return;
    }
    updateUserInformation(fd);
  };

  const updateAboutInfo = () => {
    let fd = new FormData();
    let changed = false;
    if (formData.about !== initialValues.about) {
      fd.append("about", formData.about);
      changed = true;
    }
    if (formData.description !== initialValues.description) {
      fd.append("description", formData.description);
      changed = true;
    }
    if (!changed) {
      setToastMessage("Nothing to update");
      setToastType("error");
      setToastOpen(true);
      return;
    }
    updateUserInformation(fd);
  };

  const updateUserInformation = (requestBody: any) => {
    setIsLoading(true);
    updateFormData(`${API_ENDPOINTS.USERS}/${id}`, requestBody)
      .then((response) => {
        if (response && response.data && response.data.status === "success") {
          setToastMessage(response.data.message);
          setToastType("success");
          getUser();
        } else {
          if (response.message) {
            setToastMessage(response.message);
            setToastType("error");
          } else if (response.response) {
            setToastMessage(response.response);
            setToastType("error");
          } else {
            setToastMessage("Unknown Error");
            setToastType("error");
          }
        }
        setToastOpen(true);
      })
      .then(() => setIsLoading(false));
  };

  const updatePassword = () => {
    let body = { password: "", passwordConfirm: "" };
    let error = false;
    let msg = "";
    if (formData.newPassword === "") {
      msg = "Password is required";
      error = true;
    }
    if (formData.confirmPassword === "") {
      msg =
        msg !== ""
          ? "Password and confirm password fields are required"
          : "Confirm password field is required";
      error = true;
    }
    if (error) {
      setToastMessage(msg);
      setToastType("error");
      setToastOpen(true);
      return;
    }
    if (formData.newPassword === formData.confirmPassword) {
      body = {
        password: formData.newPassword,
        passwordConfirm: formData.confirmPassword,
      };
    } else {
      setToastMessage("Password and confirm password are not same");
      setToastType("error");
      setToastOpen(true);
      return;
    }
    setIsLoading(true);
    updateData(
      `${API_ENDPOINTS.USERS}${API_ENDPOINTS.UPDATE_PASSWORD}/${id}`,
      body
    )
      .then((response) => {
        if (response && response.data && response.data.status === "success") {
          setToastMessage(response.data.message);
          setToastType("success");
          resetPasswordInformation();
        } else {
          if (response.message) {
            setToastMessage(response.message);
            setToastType("error");
          } else if (response.response) {
            setToastMessage(response.response);
            setToastType("error");
          } else {
            setToastMessage("Unknown Error");
            setToastType("error");
          }
        }
        setToastOpen(true);
      })
      .then(() => setIsLoading(false));
  };

  const getUser = () => {
    setIsLoading(true);
    getData(`${API_ENDPOINTS.USERS}/${id}`)
      .then((response) => {
        if (response && response.data && response.data.status === "success") {
          let responseResult = response.data.data.result;
          setFormData({ name: "image", value: responseResult.image });
          setFormData({ name: "firstName", value: responseResult.firstName });
          setFormData({ name: "lastName", value: responseResult.lastName });
          setFormData({ name: "userName", value: responseResult.username });
          setFormData({ name: "joined", value: responseResult.createdAt });
          setFormData({ name: "email", value: responseResult.email });
          if (responseResult.about) {
            setFormData({ name: "about", value: responseResult.about });
          }
          if (responseResult.description) {
            setFormData({
              name: "description",
              value: responseResult.description,
            });
          }
          if (responseResult.bannerImage) {
            setFormData({
              name: "bannerImage",
              value: responseResult.bannerImage,
            });
          }
          if (responseResult.phone) {
            setFormData({
              name: "phone",
              value:
                responseResult.phone && responseResult.phone.indexOf("+") > -1
                  ? responseResult.phone.slice(3)
                  : responseResult.phone.indexOf("0") === 0
                  ? responseResult.phone.slice(1)
                  : responseResult.phone,
            });
          } else {
            setFormData({
              name: "phone",
              value: "",
            });
          }
          setFormData({
            name: "signedUpWithEmail",
            value: responseResult.signedUpWithEmail,
          });
          setFormData({
            name: "signedUpWithPhone",
            value: responseResult.signedUpWithPhone,
          });
          setFormData({ name: "_id", value: responseResult._id });

          setInitialValues({ name: "image", value: responseResult.image });
          setInitialValues({
            name: "firstName",
            value: responseResult.firstName,
          });
          setInitialValues({
            name: "lastName",
            value: responseResult.lastName,
          });
          setInitialValues({
            name: "userName",
            value: responseResult.username,
          });
          setInitialValues({
            name: "about",
            value: responseResult.about,
          });
          setInitialValues({
            name: "description",
            value: responseResult.description,
          });
          setInitialValues({ name: "joined", value: responseResult.createdAt });
          setInitialValues({ name: "email", value: responseResult.email });
          setInitialValues({ name: "phone", value: responseResult.phone });
          setInitialValues({
            name: "signedUpWithEmail",
            value: responseResult.signedUpWithEmail,
          });
          setInitialValues({
            name: "signedUpWithPhone",
            value: responseResult.signedUpWithPhone,
          });
          setInitialValues({ name: "_id", value: responseResult._id });
        } else {
          if (response.message) {
            setToastMessage(response.message);
            setToastType("error");
          } else if (response.response) {
            setToastMessage(response.response);
            setToastType("error");
          } else {
            setToastMessage("Unknown Error");
            setToastType("error");
          }
          setToastOpen(true);
        }
      })
      .then(() => setIsLoading(false));
  };

  //   useEffects
  useEffect(() => {
    getUser();
  }, []);

  return {
    formData,
    handleChange,
    handleImageChange,
    handlePhoneInputChange,
    isLoading,
    toastMessage,
    toastOpen,
    toastType,
    setToastOpen,
    resetUserInformation,
    resetPasswordInformation,
    resetUserAboutInformation,
    resetBannerImage,
    resetImage,
    updateImage,
    updateUser,
    updatePassword,
    updateAboutInfo,
    updateBannerImage,
  };
};

export default useUserDetail;
