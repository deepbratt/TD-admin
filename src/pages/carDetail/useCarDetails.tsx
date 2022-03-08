import moment from "moment";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { deleteData, getData, updateData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import calendarIcon from "../../assets/icons/calendar.png";
import transmissionIcon from "../../assets/icons/gear_shift.png";
import gasolineIcon from "../../assets/icons/gasoline.png";
import speedOmeterIcon from "../../assets/icons/speedometer.png";
import { ASSEMBLY, BODY_COLOR, BODY_TYPE, CITY, ENGINE_CAPACITY, FIRST_NAME, GENDER, LAST_NAME, LAST_UPDATED, REGISTERED_IN } from "../../utils/constants/language/en/text";

const defaultData = {
  location: {
    coordinates: {
      lat: 0,
      long: 0,
    },
    type: "",
    address: "",
  },
  image: [],
  features: [],
  favOf: [],
  isSold: false,
  active: true,
  banned: false,
  _id: "",
  country: "",
  city: "",
  province: "",
  model: "",
  make: "",
  transmission: "",
  assembly: "",
  registrationCity: "",
  bodyColor: "",
  milage: 0,
  condition: "",
  description: "",
  bodyType: "",
  engineType: "",
  engineCapacity: 0,
  regNumber: "",
  sellerType: "",
  modelYear: 0,
  price: 0,
  createdBy: {
    signedUpWithEmail: true,
    signedUpWithPhone: false,
    role: "",
    active: true,
    ban: false,
    _id: "",
    banned: false,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
    dateOfBirth: "",
    city: "",
    gender: "",
    phone: "",
    passwordChangedAt: "",
  },
  imageStatus: true,
  createdAt: "",
  updatedAt: "",
  __v: 0,
  id: "",
};

const useCarDetails = () => {
  const [data, setData] = useState<any>();
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [result, setResult] = useState<any>(defaultData);
  const { id } = useParams<{ id: string }>();
  const history = useHistory()
  const [isBanned, setIsBanned] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isSold, setIsSold] = useState(true);
  const [sellDialog, setSellDialog] = useState(false);
  const [detail, setDetail] = useState<Array<any>>([]);
  const [seller, setSeller] = useState<Array<any>>([]);
  const [specs, setSpecs] = useState<Array<any>>([]);
  const [featuresArray, setFeaturesArray] = useState<Array<any>>([]);
  const [bodyTypesArray, setBodyTypesArray] = useState<Array<any>>([]);
  const [carFeatures, setCarFeatures] = useState<Array<any>>([]);

  // functions
  const getFeaturesAndBodyTypes = () => {
    getData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.CAR_FEATURES}`
    )
      .then((response) => {
        if (response && response.data && response.data.status === "success") {
          let result = response.data.data.result;
          // let featureName = result.map((el: any) => el.name);
          setFeaturesArray(result);
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

  const getCarDetail = () => {
    setIsLoading(true);
    getFeaturesAndBodyTypes()
    let endpoint = `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}/${id}`;
    getData(endpoint)
      .then((response: any) => {
        window.scrollTo(0, 0);
        if (response && response.data && response.data.status === "success") {
          setData(response.data);
          let responseResult = response.data.data.result;
          setResult(responseResult);
          setIsBanned(responseResult.banned);
          setIsActive(responseResult.active);
          setIsSold(responseResult.isSold)
          setDetail([
            { name: REGISTERED_IN, value: responseResult.registrationCity },
            { name: ASSEMBLY, value: responseResult.assembly },
            { name: BODY_TYPE, value: responseResult.bodyType },
            { name: BODY_COLOR, value: responseResult.bodyColor },
            { name: ENGINE_CAPACITY, value: responseResult.engineCapacity + " cc"},
            { name: LAST_UPDATED, value: moment(responseResult.updatedAt).format("DD MMMM YYYY") },
          ]);
          setSeller([
            { name: FIRST_NAME, value: responseResult.createdBy.firstName },
            { name: LAST_NAME, value: responseResult.createdBy.lastName },
            { name: GENDER, value: responseResult.createdBy.gender },
            { name: CITY, value: responseResult.createdBy.city },
          ]);
          setSpecs([
            {icon: calendarIcon, value:responseResult.modelYear},
            {icon: speedOmeterIcon, value:responseResult.milage},
            {icon: gasolineIcon, value:responseResult.engineType},
            {icon: transmissionIcon, value:responseResult.transmission},
          ])
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

  const toggleBan = () => {
    let banUnban = isBanned ? API_ENDPOINTS.MARK_UNBAN : API_ENDPOINTS.MARK_BAN;
    setIsLoading(true);
    updateData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${banUnban}/${id}`
    ).then((response: any) => {
      if (response && response.data && response.data.status === "success") {
        setIsBanned(!isBanned);
        setToastMessage(response.data.message);
        setToastType("success");
      } else {
        
        setToastMessage(response.message);
        setToastType("error");
      }
      setToastOpen(true);
      setIsLoading(false);
    });
  };

  const toggleActive = () => {
    let activeInactive = isActive
      ? API_ENDPOINTS.MARK_INACTIVE
      : API_ENDPOINTS.MARK_ACTIVE;
    setIsLoading(true);
    updateData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${activeInactive}/${id}`
    ).then((response: any) => {
      if (response && response.data && response.data.status === "success") {
        setIsActive(!isActive);
        setToastMessage(response.data.message);
        setToastType("success");
      } else {
        
        setToastMessage(response.message);
        setToastType("error");
      }
      setToastOpen(true);
      setIsLoading(false);
    });
  };
  const toggleSold = (soldHere:boolean=false) => {
    let soldUnsold = isSold
      ? API_ENDPOINTS.MARK_UNSOLD
      : API_ENDPOINTS.MARK_SOLD;
      if(sellDialog){
        setSellDialog(false)
      }
      let requestBody = {soldByUs: soldHere}
    setIsLoading(true);
    updateData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${soldUnsold}/${id}` , !isSold ? requestBody : undefined
    ).then((response: any) => {
      if (response && response.data && response.data.status === "success") {
        setIsSold(!isSold);
        setToastMessage(response.data.message);
        setToastType("success");
      } else {
        
        setToastMessage(response.message);
        setToastType("error");
      }
      setToastOpen(true);
      setIsLoading(false);
    });
  };

  const deleteAd = () => {
    setIsLoading(true);
    deleteData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}/${id}`).then(
      (response: any) => {
        if (response && response.data && response.data.status === "success") {
          setToastMessage(response.data.message);
          setToastType("success");
          history.goBack()
        } else {
          
          setToastMessage(response.message);
          setToastType("error");
        }
        setToastOpen(true);
        setIsLoading(false);
        setDeleteDialog(false)
      }
    );
  };

  const makeFeatureArray = () =>{
    let temp : Array<any> = []
    temp = featuresArray.filter((item:any)=> result.features.some((el:any)=>item.name===el))
    setCarFeatures(temp)
  }

  //   useEffects
  useEffect(() => {
    getCarDetail();
  }, []);

  useEffect(()=>{
    if(featuresArray.length > 0 && result){
      makeFeatureArray()
    }
  },[featuresArray, result])

  //   return
  return {
    data,
    result,
    isLoading,
    toastMessage,
    toastOpen,
    toastType,
    setToastOpen,
    isBanned,
    isActive,
    deleteAd,
    toggleActive,
    toggleBan,
    toggleSold,
    id,
    seller,
    detail,
    specs,
    setDeleteDialog,
    deleteDialog,
    setSellDialog,
    sellDialog,
    isSold,
    featuresArray,
    bodyTypesArray,
    carFeatures
  };
};

export default useCarDetails;
