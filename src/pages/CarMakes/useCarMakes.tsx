import { useEffect, useState } from "react";
import { addData, deleteData, getData, updateData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";

const useCarMakes = () => {
  const [data, setData] = useState<any>();
  const [result, setResult] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [makeName, setMakeName] = useState("");
  const [makeId, setMakeId] = useState("");

  // functions
  const getMakes = () => {
    setIsLoading(true);
    getData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.CAR_MAKES}`
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
    if(makeId){
      apiResponse = await updateData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.CAR_MAKES}/${makeId}`, formBody)
    }else{
      apiResponse = await addData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.CAR_MAKES}`, formBody)
    }
    return apiResponse
  }

  const createMake = () => {
    setIsLoading(true);
    let body = { name: makeName };
    addEditData(body)
      .then((response: any) => {
        
        if (response && response.data && response.data.status === "success") {
          if(makeId){
            let temp = result
             temp = temp.filter((item:any)=>{
               if(item._id===makeId){
                 item.name = makeName
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
    cancelCreateMake()
  };

  const cancelCreateMake = () => {
    setMakeName("");
    setMakeId("");
    setAddDialog(false);
  };

  const editMake = (make:any) => {
    setMakeId(make._id);
    setMakeName(make.name);
    setAddDialog(true);
  };

  const deleteMake = () => {
    if (makeId === "") {
      setDeleteDialog(false);
      return;
    }
    setIsLoading(true);
    deleteData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.CAR_MAKES}/${makeId}`
    )
      .then((response: any) => {
        
        if (response && response.data && response.data.status === "success") {
          setToastMessage(response.data.message);
          setToastType("success");
          getMakes();
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
    setDeleteDialog(false);
    setMakeId("");
  };

  //   useEffects
  useEffect(() => {
    getMakes();
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
    makeName,
    setMakeName,
    createMake,
    cancelCreateMake,
    deleteMake,
    makeId,
    setMakeId,
    editMake
  };
};

export default useCarMakes;
