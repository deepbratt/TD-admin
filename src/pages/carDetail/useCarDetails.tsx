import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [result, setResult] = useState<any>(defaultData);
  const { id } = useParams<{ id: string }>();
  const [isBanned, setIsBanned] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [detail, setDetail] = useState<Array<any>>([]);
  const [seller, setSeller] = useState<Array<any>>([]);
  const [specs, setSpecs] = useState<Array<any>>([]);

  // functions
  const getCarDetail = () => {
    setIsLoading(true);
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
        console.log(response);
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
        console.log(response);
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
        } else {
          console.log(response);
          setToastMessage(response.message);
          setToastType("error");
        }
        setToastOpen(true);
        setIsLoading(false);
      }
    );
  };

  //   useEffects
  useEffect(() => {
    getCarDetail();
  }, []);

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
    id,
    seller,
    detail,
    specs
  };
};

export default useCarDetails;
