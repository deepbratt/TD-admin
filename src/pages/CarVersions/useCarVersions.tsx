import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { addData, deleteData, getData, updateData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";

const useCarVersions = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>();
  const [result, setResult] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [versionName, setVersionName] = useState("");
  const [versionId, setVersionId] = useState("");

  // functions
  const getVersions = () => {
    setIsLoading(true);
    getData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.MODEL_VERSIONS}${id}`
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

  const addEditData = async (formBody: any) => {
    let apiResponse: any;
    if (versionId) {
      apiResponse = await updateData(
        `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.UPDATE_VERSION}/${versionId}`,
        formBody
      );
    } else {
      apiResponse = await addData(
        `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.ADD_VERSION}`,
        formBody
      );
    }
    return apiResponse;
  };

  const createVersion = () => {
    setIsLoading(true);
    let body = {
      model_id: id,
      name: versionName,
    };
    addEditData(body)
      .then((response: any) => {
        console.log(response);
        if (response && response.data && response.data.status === "success") {
          if (versionId) {
            let temp = result;
            temp = temp.filter((item: any) => {
              if (item._id === versionId) {
                item.name = versionName;
              }
              return item;
            });
            setResult([...temp]);
          } else {
            let temp: any = result;
            temp.push(response.data.data.result);
            setResult(temp);
          }
          setToastMessage(response.data.message);
          setToastType("success");
          getVersions();
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
    cancelCreateVersion();
  };

  const editVersion = (version: any) => {
    setVersionId(version._id);
    setVersionName(version.name);
    setAddDialog(true);
  };

  const cancelCreateVersion = () => {
    setVersionName("");
    setVersionId("");
    setAddDialog(false);
  };

  const deleteVersion = () => {
    if (versionId === "") {
      setDeleteDialog(false);
      return;
    }
    setIsLoading(true);
    deleteData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.REMOVE_VERSION}/${versionId}`
    )
      .then((response: any) => {
        console.log(response);
        if (response && response.data && response.data.status === "success") {
          setToastMessage(response.data.message);
          setToastType("success");
          getVersions();
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
    setVersionId("");
  };

  //   useEffects
  useEffect(() => {
    getVersions();
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
    versionName,
    setVersionName,
    createVersion,
    cancelCreateVersion,
    deleteVersion,
    versionId,
    setVersionId,
    editVersion,
  };
};

export default useCarVersions;
