import { useEffect, useReducer, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import CarAdditionalInformation from '../../sections/CarAddEditForms/CarAdditionalInformation';
import CarInformationForm from '../../sections/CarAddEditForms/CarInformationForm/CarInformationForm';
import UploadPhotosForm from '../../sections/CarAddEditForms/UploadPhotosForm';
import { City, State } from 'country-state-city';
import { IState } from 'country-state-city/dist/lib/interface';
import { useCallback } from 'react';
import { useRef } from 'react';
import {  addFormData, deleteData, getData, updateFormData } from '../../utils/API/APIs';
import { API_ENDPOINTS } from '../../utils/API/endpoints';
import Sizes from '../../utils/functions/Sizes';
import { routes } from '../../routes/paths';
const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.name]: event.value
  };
};

const initialFieldValues = {
  city: '',
  carModel: '',
  carMake: '',
  modelYear: '',
  modelVersion:'',
  bodyColor: '',
  bodyType: '',
  bodyCondition: '',
  registeredIn: '',
  mileage: '',
  price: '',
  registrationNo: '',
  description: '',
  engineType: '',
  engineCapacity: '',
  transmission: '',
  assembly: '',
  sellerType: '',
  images: [],
  features: [],
  province: '',
  location: { coordinates: { lat: '', long: '' }, address: '' }
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
  description: false
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
  sellerType: false
};

const useAddEditCar = () => {
  const history = useHistory();
  const size = Sizes();
  const { id } = useParams<{ id: string }>();
  const formRef = useRef<any>(null);
  // const {user} = useSelector((state: RootState)=>state.auth)
  const [assistanceDialog, setAssistanceDialog] = useState(false)
  const [helpComingDialog, setHelpComingDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [phoneRequiredDialog, setPhoneRequiredDialog] = useState(false)
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [formData, setFormData] = useReducer(formReducer, initialFieldValues);
  const [activeStep, setActiveStep] = useState(0);
  const [images, setImages] = useState<Array<any>>([]);
  const [requireError, setRequireError] = useState({
    ...initialRequireError,
    ...initialRequireError_2
  });
  const updateImagesState = (img: any) => {
    setImages(img);
    setFormData({ name: 'images', value: img });
  };
  const handleChange = (event: any) => {
    setFormData({
      name: event.target.name,
      value:
        event.target.name === 'image'
          ? event.target.files[0]
          : event.target.value
    });
    event.target.value = event.target.name === 'image' && null;
  };
  
  const handleChangeSelect = (name: string, value: any) => {
    setFormData({ name: name, value: value });
  };
  const ComponentContent = [
    <CarInformationForm
      formData={formData}
      handleChange={handleChange}
      requireError={requireError}
      handleChangeSelect={handleChangeSelect}
      setFormData = {setFormData}
    />,
    <UploadPhotosForm
      images={images}
      updateImagesState={updateImagesState}
      key={images.length}
      requireError={requireError.images}
    />,
    <CarAdditionalInformation
      formData={formData}
      handleChange={handleChange}
      requireError={requireError}
      setFormData={setFormData}
    />
  ];

  const profileRedirect = () =>{
    history.goBack()
  }

  const needAssistance = (needed : boolean = false)=>{
    if(needed){
      // api to inform assistance needed
      setHelpComingDialog(true)
    }
    setAssistanceDialog(false)
  }

  const getCarData = useCallback(() => {
    setIsLoading(true);
    getData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}/${id}`).then((response) => {
      if (response && response.data && response.data.status === 'success') {
        let result = response.data.data.result;
        if(!result.createdBy.phone){
          setPhoneRequiredDialog(true)
           return
        }
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
          location: { coordinates: { lat: '', long: '' }, address: '' }
        };
        Object.keys(FieldValues).forEach((key) => {
          setFormData({ name: key, value: FieldValues[key] });
        });
        setImages(FieldValues.images);
      } else {
        console.log(response);
        if(response.data){
          setToastMessage(response.data.message);
          setToastType('error');
          setToastOpen(true);
          history.goBack();
        }else{
          setToastMessage("Network Error");
          setToastType('error');
          setToastOpen(true);
          history.goBack();
        }
      }
      setIsLoading(false);
    });
  }, [id]);

  useEffect(() => {
    // if(!user.phone){
    //   setPhoneRequiredDialog(true)
    // }else{
    //   setAssistanceDialog(true)
    // }
    if (id) {
      getCarData();
    }
  }, [getCarData, id]);

  const allFalse = (obj: any) => {
    for (var o in obj) {
      if (obj[o]) return false;
    }
    return true;
  };
  const handleDeleteAd = () => {
    setIsLoading(true);
    setDeleteDialog(false);
    deleteData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}/${id}`).then((response) => {
      setIsLoading(false)
      if (response && response.data && response.data.status === 'success') {
          setToastMessage(response.data.message);
          setToastType('success');
          setToastOpen(true);
          history.push(routes.advertisements);
      } else {
        console.log('error', response);
        if (!response.response) {
          setToastMessage('Network Error');
          setToastType('error');
          setToastOpen(true);
        } else {
          setToastMessage(response.message);
          setToastType('error');
          setToastOpen(true);
        }
      }
    });
  };

  const checkValidation = (validationObject: object) => {
    let flagRequireError = Object.assign({}, validationObject);
    Object.keys(validationObject).forEach((key) => {
      if (formData[key] === '' || formData[key] === 'null' || !formData[key]) {
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

  const addEditData = async(formBody:any)=>{
    let result : any
    if(id){
      let carId = id ? "/"+id : ""
     result = await updateFormData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${carId}`, formBody)
    }else{
      result = await addFormData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}`, formBody)
    }
    return result
  }

  const formValidated=()=>{
    if (activeStep === 0) {
      if (!checkValidation(initialRequireError)) {
        return false;
      } else {
        let cityData = City.getCitiesOfCountry('PK');
        let cityInformation = cityData?.filter(
          (city) => city.name === formData.city
        );
        let provinceInformation: IState | undefined;
        if (cityInformation) {
          provinceInformation = State.getStateByCodeAndCountry(
            cityInformation[0].stateCode,
            'PK'
          );
          setFormData({
            name: 'location',
            value: {
              coordinate: {
                lat: cityInformation[0].latitude,
                long: cityInformation[0].longitude
              },
              address: `${formData.city}, ${provinceInformation?.name}`
            }
          });
          setFormData({ name: 'province', value: provinceInformation?.name });
        }
      }
    } else if (activeStep === 1) {
      let secondStepValidated = images.length > 0;
      console.log(images.length > 0 && images.length < 21)
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
    return true
  }

  const submitForm = () =>{
    console.log('submit following data: ');
    console.log(formData);
    let fd = new FormData();
    fd.append('country', 'Pakistan');
    fd.append('city', formData.city);
    fd.append('province', formData.province);
    fd.append('location.address', formData.location.address);
    fd.append('location.coordinates.lat', formData.location.coordinate.lat);
    fd.append('location.coordinates.long', formData.location.coordinate.long);
    let StringUrls = 0;
    for (let i = 0; i < formData.images.length; i++) {
      if (typeof formData.images[i] === typeof 'string') {
        fd.append('image[' + StringUrls + ']', images[i]);
        StringUrls++;
      } else {
        fd.append('image', images[i]);
      }
    }
    fd.append('model', formData.carModel);
    fd.append('make', formData.carMake);
    fd.append('version', formData.modelVersion);
    fd.append('transmission', formData.transmission);
    fd.append('assembly', formData.assembly);
    fd.append('registrationCity', formData.registeredIn);
    fd.append('bodyColor', formData.bodyColor);
    fd.append('milage', formData.mileage);
    fd.append('condition', formData.bodyCondition);
    fd.append('description', formData.description);
    fd.append('bodyType', formData.bodyType);
    fd.append('engineType', formData.engineType);
    fd.append('engineCapacity', formData.engineCapacity);
    fd.append('regNumber', formData.registrationNo);
    fd.append('sellerType', formData.sellerType);
    // fd.append("date", new Date(formData.modelYear).toISOString());
    fd.append('modelYear', formData.modelYear);
    // fd.append("features", formData.features);
    for (let i = 0; i < formData.features.length; i++) {
      fd.append('features', formData.features[i]);
    }
    fd.append('price', formData.price);
    console.table(Object.fromEntries(fd));
    setIsLoading(true);
    // let addEditCarApi = id ? updateFormData : addFormData
    // let carId = id ? "/"+id : ""
    addEditData(fd).then((response) => {
      setIsLoading(false);
      if (response && response.data && response.data.status === 'success') {
        console.log('response', response);
        setToastMessage(response.data.message);
        setToastType('success');
        setToastOpen(true);
        let fieldValues: any = initialFieldValues;
        Object.keys(fieldValues).forEach((key) => {
          setFormData({ name: key, value: fieldValues[key] });
        });
        setImages([]);
        if(id){
          history.goBack(); 
        }
        setActiveStep(0);
      } else {
        console.log('error', response);
        if (!response.response) {
          setToastMessage('Network Error');
          setToastType('error');
          setToastOpen(true);
        } else {
          setToastMessage(response.data.message);
          setToastType('error');
          setToastOpen(true);
        }
      }
    });
  }

  const handleNext = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
    if(!formValidated()){
      return
    }
    if (activeStep === 2) {
      submitForm()
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const lgMdSmPx = (lgMd: string, sm: string) =>{
    return size.desktop || size.tablet ? lgMd : sm
  }

  return {
    setActiveStep,
    activeStep,
    handleBack,
    handleNext,
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
    needAssistance
  };
};

export default useAddEditCar;

// White Hatchback Civic Imported for sale in Islamabad.
