import { useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router";
import CarAdditionalInformation from "../../sections/CarAddEditForms/CarAdditionalInformation/index";
import CarInformationForm from "../../sections/CarAddEditForms/CarInformationForm/CarInformationForm";
import UploadPhotosForm from "../../sections/CarAddEditForms/UploadPhotosForm";
import { City, State } from "country-state-city";
import { IState } from "country-state-city/dist/lib/interface";
import { useCallback } from "react";
import { useRef } from "react";
import {
  addData,
  deleteData,
  getData,
  updateData,
} from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import Sizes from "../../utils/functions/Sizes";
import { routes } from "../../routes/paths";
import { isValidPhone } from "../../utils/functions/helperFunctions";

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const initialFieldValues = {
  city: "",
  carModel: "",
  carMake: "",
  modelYear: "",
  modelVersion: "",
  bodyColor: "",
  bodyType: "",
  bodyCondition: "",
  registeredIn: "",
  mileage: "",
  price: "",
  registrationNo: "",
  associatedPhone: "",
  description: "",
  engineType: "",
  engineCapacity: "",
  transmission: "",
  assembly: "",
  sellerType: "",
  images: [],
  selectedImage: "",
  features: [],
  province: "",
  location: { coordinates: { lat: "", long: "" }, address: "" },
};

// validating step 1
const initialRequireError = {
  city: false,
  carModel: false,
  carMake: false,
  modelYear: false,
  bodyColor: false,
  registeredIn: false,
  mileage: false,
  price: false,
  registrationNo: false,
  description: false,
  associatedPhone: false,
};

// step 2 validation is on the go

// validating step 3
const initialRequireError_2 = {
  engineType: false,
  engineCapacity: false,
  transmission: false,
  bodyCondition: false,
  bodyType: false,
  assembly: false,
  images: false,
  sellerType: false,
};

const useAddEditCar = () => {
  const history = useHistory();
  const size = Sizes();
  const { id, userId } = useParams<{ id: string; userId: string }>();
  const formRef = useRef<any>(null);
  // const {user} = useSelector((state: RootState)=>state.auth)
  const [assistanceDialog, setAssistanceDialog] = useState(false);
  const [helpComingDialog, setHelpComingDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [phoneRequiredDialog, setPhoneRequiredDialog] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [formData, setFormData] = useReducer(formReducer, initialFieldValues);
  const [activeStep, setActiveStep] = useState(0);
  const [images, setImages] = useState<Array<any>>([]);
  const [featuresArray, setFeaturesArray] = useState<Array<any>>([]);
  const [bodyTypesArray, setBodyTypesArray] = useState<Array<any>>([]);
  const [bodyColorArray, setBodyColorArray] = useState<Array<any>>([]);
  const [userPhone, setUserPhone] = useState("0");
  const [requireError, setRequireError] = useState({
    ...initialRequireError,
    ...initialRequireError_2,
  });
  const updateImagesState = (img: any) => {
    setImages(img);
    setFormData({ name: "images", value: img });
  };
  const handleChange = (event: any) => {
    setFormData({
      name: event.target.name,
      value:
        event.target.name === "image"
          ? event.target.files[0]
          : event.target.value,
    });
    if (event.target.value === "") {
      setRequireError({
        ...requireError,
        [event.target.name]: true,
      });
    } else {
      setRequireError({
        ...requireError,
        [event.target.name]: false,
      });
    }
    event.target.value = event.target.name === "image" && null;
  };

  const handleChangeSelect = (name: string, value: any) => {
    setFormData({ name: name, value: value });
    if (value === "") {
      setRequireError({
        ...requireError,
        [name]: true,
      });
    } else {
      setRequireError({
        ...requireError,
        [name]: false,
      });
    }
  };
  const ComponentContent = [
    <CarInformationForm
      formData={formData}
      handleChange={handleChange}
      requireError={requireError}
      handleChangeSelect={handleChangeSelect}
      setFormData={setFormData}
      bodyColorArray={bodyColorArray}
    />,
    <UploadPhotosForm
      images={images}
      updateImagesState={updateImagesState}
      formData={formData}
      setIsLoading={setIsLoading}
      setFormData={setFormData}
      requireError={requireError.images}
    />,
    <CarAdditionalInformation
      formData={formData}
      handleChange={handleChange}
      requireError={requireError}
      setFormData={setFormData}
      bodyTypesArray={bodyTypesArray}
      featuresArray={featuresArray}
      handleChangeSelect={handleChangeSelect}
    />,
  ];

  const getColors = () => {
    setIsLoading(true);
    getData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.CAR_COLOR}`
    )
      .then((response: any) => {
        if (response && response.data && response.data.status === "success") {
          let result = response.data.data.result;
          let temp: any[] = [];
          result.forEach((element: any) => {
            temp.push(element.name);
          });
          setBodyColorArray(temp);
        } else {
          if (response.message) {
            setToastMessage(response.message);
          } else {
            setToastMessage(response.response);
          }
          setToastOpen(true);
          setToastType("error");
        }
      })
      .then(() => setIsLoading(false));
  };

  const getFeaturesAndBodyTypes = () => {
    getColors();
    getData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.CAR_FEATURES}`
    )
      .then((response) => {
        if (response && response.data && response.data.status === "success") {
          let result = response.data.data.result;
          let featureName = result.map((el: any) => el.name);
          setFeaturesArray(featureName);
        } else {
          let msg = response.response
            ? response.response
            : response.message
            ? response.message
            : "Network Error";
          setToastMessage(msg);
          setToastType("error");
          setToastOpen(true);
        }
      })
      .then(() => setIsLoading(false));
    getData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.BODY_TYPES}`
    )
      .then((response) => {
        if (response && response.data && response.data.status === "success") {
          let result = response.data.data.result;
          let bodyTypesName = result.map((el: any) => el.bodyType);
          setBodyTypesArray(bodyTypesName);
        } else {
          let msg = response.response
            ? response.response
            : response.message
            ? response.message
            : "Network Error";
          setToastMessage(msg);
          setToastType("error");
          setToastOpen(true);
        }
      })
      .then(() => setIsLoading(false));
  };

  const profileRedirect = () => {
    history.goBack();
  };

  const needAssistance = (needed: boolean = false) => {
    if (needed) {
      // api to inform assistance needed
      setHelpComingDialog(true);
    }
    setAssistanceDialog(false);
  };

  const getUserData = () => {
    setIsLoading(true);
    getFeaturesAndBodyTypes();
    getData(`${API_ENDPOINTS.USERS}/${userId}`)
      .then((response) => {
        if (response && response.data && response.data.status === "success") {
          let result = response.data.data.result;
          console.log("result.phone", result.phone);
          if (!result.phone) {
            setPhoneRequiredDialog(true);
            return;
          }
          setUserPhone(result.phone);
          setFormData({
            name: "associatedPhone",
            value:
              result.phone.indexOf("+") > -1
                ? result.phone.slice(3)
                : result.phone.indexOf("0") === 0
                ? result.phone.slice(1)
                : result.phone,
          });
        }
      })
      .then(() => setIsLoading(false));
  };

  const getCarData = useCallback(() => {
    setIsLoading(true);
    getFeaturesAndBodyTypes();
    getData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}/${id}`).then(
      (response) => {
        if (response && response.data && response.data.status === "success") {
          let result = response.data.data.result;
          if (!result.createdBy.phone) {
            setPhoneRequiredDialog(true);
            return;
          }
          setUserPhone(result.createdBy.phone);
          let phone = result.createdBy.phone;
          if (result.associatedPhone) {
            if (result.associatedPhone.indexOf("+") > -1) {
              phone = result.associatedPhone.slice(3);
            } else if (result.associatedPhone.indexOf("0") === 0) {
              phone = result.associatedPhone.slice(1);
            }
          } else if (result.createdBy.phone.indexOf("+") > -1) {
            phone = result.createdBy.phone.slice(3);
          } else if (result.createdBy.phone.indexOf("0") === 0) {
            phone = result.createdBy.phone.slice(1);
          } else {
            phone = result.createdBy.phone;
          }
          // let phone =
          //   result.associatedPhone && result.associatedPhone.indexOf("+") > -1
          //     ? result.associatedPhone.slice(3)
          //     : result.associatedPhone.indexOf("0") === 0
          //     ? result.associatedPhone.slice(1)
          //     : result.createdBy.phone.indexOf("+") > -1
          //     ? result.createdBy.phone.slice(3)
          //     : result.createdBy.phone.indexOf("0") === 0
          //     ? result.createdBy.phone.slice(1)
          //     : result.createdBy.phone;
          setFormData({ name: "associatedPhone", value: phone });
          let FieldValues = formData;
          FieldValues = {
            city: result.city,
            carModel: result.model,
            carMake: result.make,
            modelVersion: result.version,
            modelYear: result.modelYear,
            bodyColor: result.bodyColor,
            bodyType: result.bodyType,
            bodyCondition: result.condition,
            registeredIn: result.registrationCity,
            mileage: result.milage,
            price: result.price,
            registrationNo: result.regNumber,
            description: result.description,
            engineType: result.engineType,
            engineCapacity: result.engineCapacity,
            transmission: result.transmission,
            assembly: result.assembly,
            images: result.image,
            features: result.features,
            province: result.province,
            sellerType: result.sellerType,
            selectedImage: result.selectedImage
              ? result.selectedImage
              : result.image[0]
              ? result.image[0]
              : "",
            location: { coordinates: { lat: "", long: "" }, address: "" },
          };
          console.log(result.image);
          Object.keys(FieldValues).forEach((key) => {
            setFormData({ name: key, value: FieldValues[key] });
          });
          setImages(FieldValues.images);
        } else {
          console.log(response);
          if (response.data) {
            setToastMessage(response.data.message);
            setToastType("error");
            setToastOpen(true);
            history.goBack();
          } else {
            setToastMessage("Network Error");
            setToastType("error");
            setToastOpen(true);
            history.goBack();
          }
        }
        setIsLoading(false);
      }
    );
  }, [id]);

  useEffect(() => {
    if (id) {
      getCarData();
    }
  }, [getCarData, id]);

  useEffect(() => {
    if (userId) {
      getUserData();
    }
  }, [userId]);

  const allFalse = (obj: any) => {
    for (var o in obj) {
      if (obj[o]) return false;
    }
    return true;
  };
  const handleDeleteAd = () => {
    setIsLoading(true);
    setDeleteDialog(false);
    deleteData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}/${id}`).then(
      (response) => {
        setIsLoading(false);
        if (response && response.data && response.data.status === "success") {
          setToastMessage(response.data.message);
          setToastType("success");
          setToastOpen(true);
          history.push(routes.advertisements);
          history.goBack();
        } else {
          console.log("error", response);
          if (!response.response) {
            setToastMessage("Network Error");
            setToastType("error");
            setToastOpen(true);
          } else {
            setToastMessage(response.message);
            setToastType("error");
            setToastOpen(true);
          }
        }
      }
    );
  };

  const checkValidation = (validationObject: object) => {
    let flagRequireError = Object.assign({}, validationObject);
    Object.keys(validationObject).forEach((key) => {
      if (formData[key] === "" || formData[key] === "null" || !formData[key]) {
        setRequireError((requiredError) => {
          return { ...requiredError, [key]: true };
        });
        flagRequireError = { ...flagRequireError, [key]: true };
      } else {
        setRequireError((requiredError) => {
          return { ...requiredError, [key]: false };
        });
      }
    });
    return allFalse(flagRequireError);
  };

  const addEditData = async (data: any) => {
    let result: any;
    if (id) {
      let carId = id ? "/" + id : "";
      result = await updateData(
        `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${carId}`,
        data
      );
    } else {
      result = await addData(
        `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}`,
        data
      );
    }
    return result;
  };

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const formValidated = (stepToValidate: number) => {
    let stepValidatation = stepToValidate;
    if (stepValidatation === 0) {
      if (!checkValidation(initialRequireError)) {
        return false;
      } else {
        let cityData = City.getCitiesOfCountry("PK");
        let cityInformation = cityData?.filter(
          (city: any) => city.name === toTitleCase(formData.city)
        );
        let provinceInformation: IState | undefined;
        if (cityInformation) {
          provinceInformation = State.getStateByCodeAndCountry(
            cityInformation[0].stateCode,
            "PK"
          );
          setFormData({
            name: "location",
            value: {
              coordinate: {
                lat: cityInformation[0].latitude,
                long: cityInformation[0].longitude,
              },
              address: `${formData.city}, ${provinceInformation?.name}`,
            },
          });
          setFormData({ name: "province", value: provinceInformation?.name });
        }
      }
    } else if (stepValidatation === 1) {
      let secondStepValidated = images.length > 0;
      // console.log(images.length > 0 && images.length < 21);
      setRequireError((requiredError) => {
        return { ...requiredError, images: !secondStepValidated };
      });
      if (!secondStepValidated) {
        return false; //uncomment this line to put make images mandatory/required
      }
    } else {
      if (!checkValidation(initialRequireError_2)) {
        return false;
      }
    }
    return true;
  };

  const appendImages = async (fd: any) => {
    let StringUrls = 0;
    const arrayOfImages = formData.images.filter(
      (item: any) => item !== formData.selectedImage
    );
    if (formData.selectedImage) {
      fd.append("selectedImage", formData.selectedImage);
    } else {
      fd.append("selectedImage", arrayOfImages[0]);
      arrayOfImages.splice(0, 1);
    }
    for (let i = 0; i < arrayOfImages.length; i++) {
      if (typeof arrayOfImages[i] === typeof "string") {
        fd.append("image[" + StringUrls + "]", arrayOfImages[i]);
        StringUrls++;
      } else if (arrayOfImages[i]) {
        fd.append("image", arrayOfImages[i]);
      }
    }
  };

  const submitForm = async (isPublished: any) => {
    let data = {
      'country': 'Pakistan',
      'city': formData.city,
      'province': formData.province,
      'location.address': formData.location.address,
      'location.coordinates[0]': formData.location.coordinate.long,
      'location.coordinates[1]': formData.location.coordinate.lat,
      'model': formData.carModel,
      'make': formData.carMake,
      'version': formData.modelVersion,
      'transmission': formData.transmission,
      'assembly': formData.assembly,
      'registrationCity': formData.registeredIn,
      'bodyColor': formData.bodyColor,
      'milage': formData.mileage,
      'condition': formData.bodyCondition,
      'description': formData.description,
      'bodyType': formData.bodyType,
      'engineType': formData.engineType,
      'engineCapacity': formData.engineCapacity,
      'regNumber': formData.registrationNo,
      'sellerType': formData.sellerType,
      'modelYear': formData.modelYear,
      'features': formData.features,
      'price': formData.price,
      'isPublished': isPublished,
      'selectedImage': formData.selectedImage,
      'image': formData.images,
      "associatedPhone": `+92${formData.associatedPhone}` !== userPhone ? `+92${formData.associatedPhone.replaceAll("-", "")}` : userPhone
    }
    setIsLoading(true);
    addEditData(data).then((response) => {
      setIsLoading(false);
      if (response && response.data && response.data.status === "success") {
        setToastMessage(response.data.message);
        setToastType("success");
        setToastOpen(true);
        let fieldValues: any = initialFieldValues;
        Object.keys(fieldValues).forEach((key) => {
          setFormData({ name: key, value: fieldValues[key] });
        });
        setImages([]);
        if (id) {
          history.push("/car/" + id);
        }
        setActiveStep(0);
      } else {
        let msg =
          response &&
          response.response &&
          response.response.data &&
          response.response.data.message
            ? response.response.data.message
            : response.response
            ? response.response
            : "Network Error";
        setToastMessage(msg);
        setToastType("error");
        setToastOpen(true);
        // console.log("error", response);
      }
    });
  };

  const resetForm = () => {
    let fieldValues: any = initialFieldValues;
    Object.keys(fieldValues).forEach((key) => {
      setFormData({ name: key, value: fieldValues[key] });
    });
    setImages([]);
    history.push("/advertisements");
  };

  const handleStepChange = (step: number) => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
    if (step > activeStep) {
      let error = false;
      for (let i = activeStep; i < step; i++) {
        if (!formValidated(i)) {
          setActiveStep(i);
          error = true;
          return;
        }
      }
      if (error) return;
    }
    setActiveStep(step);
  };

  const handleNext = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
    if (!formValidated(activeStep)) {
      return;
    }
    if (activeStep === 2) {
      submitForm(false);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePublish = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
    if (!formValidated(activeStep)) {
      return;
    }
    if (activeStep === 2) {
      submitForm(true);
      return;
    }
  };

  const handleBack = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const lgMdSmPx = (lgMd: string, sm: string) => {
    return size.desktop || size.tablet ? lgMd : sm;
  };

  return {
    handleStepChange,
    resetForm,
    setActiveStep,
    activeStep,
    handleBack,
    handleNext,
    handlePublish,
    formData,
    handleChange,
    images,
    setImages,
    ComponentContent,
    requireError,
    id,
    handleDeleteAd,
    formRef,
    isLoading,
    toastMessage,
    toastOpen,
    setToastOpen,
    toastType,
    setDeleteDialog,
    deleteDialog,
    lgMdSmPx,
    profileRedirect,
    phoneRequiredDialog,
    setPhoneRequiredDialog,
    setHelpComingDialog,
    helpComingDialog,
    assistanceDialog,
    needAssistance,
  };
};

export default useAddEditCar;

// White Hatchback Civic Imported for sale in Islamabad.
