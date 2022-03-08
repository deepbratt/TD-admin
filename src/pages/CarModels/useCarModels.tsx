import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { addData, deleteData, getData, updateData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";

const useCarModels = () => {
    const {id} = useParams<{id:string}>()
  const [data, setData] = useState<any>();
  const [result, setResult] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [modelName, setModelName] = useState("");
  const [modelId, setModelId] = useState("")

  // functions
  const getModels = () => {
    setIsLoading(true);
    getData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.MAKE_MODELS}${id}`
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
    if(modelId){
      apiResponse = await updateData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.MODEL}/${modelId}`, formBody)
    }else{
      apiResponse = await addData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.MODEL}`, formBody)
    }
    return apiResponse
  }

  const createModel = () => {
    setIsLoading(true);
    let body = { name: modelName, make_id: id };
    addEditData(body)
      .then((response: any) => {
        
        if (response && response.data && response.data.status === "success") {
            if(modelId){
                let temp = result
                 temp = temp.filter((item:any)=>{
                   if(item._id===modelId){
                     item.name = modelName
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
          getModels()
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
      cancelCreateModel()
  };

  const editModel=(model:any)=>{
    setModelId(model._id);
    setModelName(model.name);
    setAddDialog(true);
  }

  const cancelCreateModel = () => {
    setModelName("");
    setModelId("")
    setAddDialog(false);
  };

  const deleteModel = () => {
      if(modelId===""){
          setDeleteDialog(false)
          return
      }
      setIsLoading(true)
    deleteData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.MODEL}/${modelId}`
    )
      .then((response: any) => {
        
        if (response && response.data && response.data.status === "success") {
          setToastMessage(response.data.message);
          setToastType("success");
          getModels()
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
      setModelId('')
  };

  //   useEffects
  useEffect(() => {
    getModels();
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
    modelName,
    setModelName,
    createModel,
    cancelCreateModel,
    deleteModel,
    modelId,
    setModelId,
    editModel
  };
};

export default useCarModels;
