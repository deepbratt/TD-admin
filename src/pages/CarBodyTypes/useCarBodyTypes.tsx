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

const useCarBodyTypes= () => {
  const [data, setData] = useState<any>();
  const [result, setResult] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [bodyTypeValues, setBodyTypeValues] = useReducer(formReducer, initialFieldValues);

  // functions
  const handleChange = (event: any) => {
    setBodyTypeValues({
      name: event.target.name,
      value:
        event.target.name === 'image'
          ? event.target.files[0]
          : event.target.value
    });
    event.target.value = event.target.name === 'image' && null;
  };
  const getBodyTypes = () => {
    setIsLoading(true);
    getData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.BODY_TYPES}`
    )
      .then((response: any) => {
        console.log(response);
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
    if(bodyTypeValues._id){
      apiResponse = await updateData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.BODY_TYPES}/${bodyTypeValues._id}`, formBody)
    }else{
      apiResponse = await addData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.BODY_TYPES}`, formBody)
    }
    return apiResponse
  }

  const createBodyType = () => {
    setIsLoading(true);
    let fd = new FormData()
    fd.append("bodyType", bodyTypeValues.name)
    fd.append("image", bodyTypeValues.image)
    addEditData(fd)
      .then((response: any) => {
        console.log(response);
        if (response && response.data && response.data.status === "success") {
            if(bodyTypeValues._id){
                let temp = result
                 temp = temp.filter((item:any)=>{
                   if(item._id===bodyTypeValues._id){
                     item.bodyType = bodyTypeValues.name
                    //  item.image = bodyTypeValues.image
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
          getBodyTypes()
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
      cancelCreateBodyType()
  };

  const editBodyType=(bodyType:any)=>{
    setBodyTypeValues({name:"name", value:bodyType.bodyType})
    setBodyTypeValues({name:"_id", value:bodyType._id})
    setBodyTypeValues({name:"image", value:bodyType.image})
    setAddDialog(true);
  }

  const cancelCreateBodyType = () => {
    setBodyTypeValues({name:"name", value:""})
    setBodyTypeValues({name:"_id", value:""})
    setBodyTypeValues({name:"image", value:""})
    setAddDialog(false);
  };

  const deleteBodyType = () => {
      if(bodyTypeValues._id===""){
          setDeleteDialog(false)
          return
      }
      setIsLoading(true)
    deleteData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.BODY_TYPES}/${bodyTypeValues._id}`
    )
      .then((response: any) => {
        console.log(response);
        if (response && response.data && response.data.status === "success") {
          setToastMessage(response.data.message);
          setToastType("success");
          getBodyTypes()
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
      setBodyTypeValues({name:"_id", value:""})
  };

  //   useEffects
  useEffect(() => {
    getBodyTypes();
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
    setBodyTypeValues,
    bodyTypeValues,
    handleChange,
    createBodyType,
    cancelCreateBodyType,
    deleteBodyType,
    editBodyType
  };
};

export default useCarBodyTypes;
