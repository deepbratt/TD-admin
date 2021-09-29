import { useEffect, useState } from "react";
import { addData, deleteData, getData, updateData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";

const defaultColor = "#000000"

const useCarColors = () => {
  const [data, setData] = useState<any>();
  const [result, setResult] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [colorName, setColorName] = useState("");
  const [colorCode, setColorCode] = useState(defaultColor);
  const [colorId, setColorId] = useState("");

  // functions
  const getColors = () => {
    setIsLoading(true);
    getData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.CAR_COLOR}`
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

  const addEditData = async (formBody: any) => {
    let apiResponse: any;
    if (colorId) {
      apiResponse = await updateData(
        `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.CAR_COLOR}/${colorId}`,
        formBody
      );
    } else {
      apiResponse = await addData(
        `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.CAR_COLOR}`,
        formBody
      );
    }
    return apiResponse;
  };

  const createColor = () => {
    setIsLoading(true);
    let body = {
      name: colorName,
      code: colorCode
    };

    addEditData(body)
      .then((response: any) => {
        console.log(response);
        if (response && response.data && response.data.status === "success") {
          if (colorId) {
            let temp = result;
            temp = temp.filter((item: any) => {
              if (item._id === colorId) {
                item.name = colorName;
                item.code = colorCode
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
          getColors();
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
    cancelCreateColor();
  };

  const editColor = (color: any) => {
    setColorId(color._id);
    setColorName(color.name);
    setColorCode(color.code);
    setAddDialog(true);
  };

  const cancelCreateColor = () => {
    setColorName("");
    setColorCode(defaultColor)
    setColorId("");
    setAddDialog(false);
  };

  const deleteColor = () => {
    if (colorId === "") {
      setDeleteDialog(false);
      return;
    }
    setIsLoading(true);
    deleteData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${API_ENDPOINTS.CAR_COLOR}/${colorId}`
    )
      .then((response: any) => {
        console.log(response);
        if (response && response.data && response.data.status === "success") {
          setToastMessage(response.data.message);
          setToastType("success");
          getColors();
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
    setColorId("");
  };

  //   useEffects
  useEffect(() => {
    getColors();
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
    colorName,
    setColorName,
    createColor,
    cancelCreateColor,
    deleteColor,
    colorId,
    setColorId,
    editColor,
    colorCode,
    setColorCode
  };
};

export default useCarColors;
