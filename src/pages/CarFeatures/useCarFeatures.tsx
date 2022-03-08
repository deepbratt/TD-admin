import { useEffect, useReducer, useState } from "react";
import { addData, deleteData, getData, updateData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";

const formReducer = (state: any, event: any) => {
    return {
      ...state,
      [event.name]: event.value
    };
  };

  const initialFieldValues = {
      _id:"",
      name:"",
      image:""
  }

const useCarFeatures= () => {
  const [data, setData] = useState<any>();
  const [result, setResult] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [featuresValues, setFeaturesValues] = useReducer(formReducer, initialFieldValues);

  // functions
  const handleChange = (event: any) => {
    setFeaturesValues({
      name: event.target.name,
      value:
        event.target.name === 'image'
          ? event.target.files[0]
          : event.target.value
    });
    event.target.value = event.target.name === 'image' && null;
  };
  const getFeaturess = () => {
    setIsLoading(true);
    getData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.CAR_FEATURES}`
    )
      .then((response: any) => {
        
        if (response && response.data && response.data.status === "success") {
          setData(response.data);
          setResult(response.data.data.result);
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

  const addEditData = async(formBody:any)=>{
    let apiResponse : any
    if(featuresValues._id){
      apiResponse = await updateData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.CAR_FEATURES}/${featuresValues._id}`, formBody)
    }else{
      apiResponse = await addData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.CAR_FEATURES}`, formBody)
    }
    return apiResponse
  }

  const createFeatures = () => {
    setIsLoading(true);
    let fd = new FormData()
    fd.append("name", featuresValues.name)
    fd.append("image", featuresValues.image)
    addEditData(fd)
      .then((response: any) => {
        
        if (response && response.data && response.data.status === "success") {
            if(featuresValues._id){
                let temp = result
                 temp = temp.filter((item:any)=>{
                   if(item._id===featuresValues._id){
                     item.name = featuresValues.name
                    //  item.image = featuresValues.image
                   }
                   return item
                  })
                  setResult([...temp])
              }else{
                let temp:any = result
                temp.push(response.data.data.result)
                setResult(temp)
              }
          setToastMessage(response.data.message);
          setToastType("success");
          getFeaturess()
        } else {
          if (response.message) {
            setToastMessage(response.message);
          } else {
            setToastMessage(response.response);
          }
          setToastType("error");
        }
        setToastOpen(true);
      })
      .then(() => setIsLoading(false));
      cancelCreateFeatures()
  };

  const editFeatures=(features:any)=>{
    setFeaturesValues({name:"name", value:features.name})
    setFeaturesValues({name:"_id", value:features._id})
    setFeaturesValues({name:"image", value:features.image})
    setAddDialog(true);
  }

  const cancelCreateFeatures = () => {
    setFeaturesValues({name:"name", value:""})
    setFeaturesValues({name:"_id", value:""})
    setFeaturesValues({name:"image", value:""})
    setAddDialog(false);
  };

  const deleteFeatures = () => {
      if(featuresValues._id===""){
          setDeleteDialog(false)
          return
      }
      setIsLoading(true)
    deleteData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.CAR_FEATURES}/${featuresValues._id}`
    )
      .then((response: any) => {
        
        if (response && response.data && response.data.status === "success") {
          setToastMessage(response.data.message);
          setToastType("success");
          getFeaturess()
        } else {
          if (response.message) {
            setToastMessage(response.message);
          } else {
            setToastMessage(response.response);
          }
          setToastType("error");
        }
        setToastOpen(true);
      })
      .then(() => setIsLoading(false));
      setDeleteDialog(false)
      setFeaturesValues({name:"_id", value:""})
  };

  //   useEffects
  useEffect(() => {
    getFeaturess();
  }, []);

  return {
    result,
    setResult,
    data,
    setData,
    toastMessage,
    setToastMessage,
    toastOpen,
    setToastOpen,
    toastType,
    setToastType,
    isLoading,
    setIsLoading,
    setDeleteDialog,
    deleteDialog,
    addDialog,
    setAddDialog,
    setFeaturesValues,
    featuresValues,
    handleChange,
    createFeatures,
    cancelCreateFeatures,
    deleteFeatures,
    editFeatures
  };
};

export default useCarFeatures;
