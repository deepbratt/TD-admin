import { useState } from "react";
import { deleteData, updateData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import { isResponseSuccess } from "../../utils/functions/helperFunctions";

const useTicketsTableRow = (
  data: any,
  resultArray: Array<any>,
  setResultArray: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const [status, setStatus] = useState(data.status);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const openClose = async () => {
    let response: any;
    if (status === "opened") {
      response = await updateData(
        `${API_ENDPOINTS.TICKETS}${API_ENDPOINTS.TICKET_ClOSE}/${data._id}`
      );
    } else {
      let body = { status: "opened" };
      response = await updateData(`${API_ENDPOINTS.TICKETS}/${data._id}`, body);
    }
    return response;
  };

  const toggleStatus = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(e){
      e.stopPropagation();
    }
    setIsLoading(true);
    openClose().then((response: any) => {
      let responseSuccessStatus = isResponseSuccess(response);
      if (responseSuccessStatus.success) {
        let responseStatus = status === "opened" ? "closed" : "opened";
        setStatus(responseStatus);
        setToastMessage(response.data.message);
        setToastType("success");
      } else {
        
        setToastMessage(response.message);
        setToastType("error");
      }
      setToastOpen(true);
      setIsLoading(false);
      setOpenDetail(false)
    });
  };

  const deleteTicket = () => {
    setIsLoading(true);
    deleteData(`${API_ENDPOINTS.TICKETS}/${data._id}`).then((response: any) => {
      let responseSuccessStatus = isResponseSuccess(response);
      if (responseSuccessStatus.success) {
        let responseStatus = status === "opened" ? "closed" : "opened";
        let temp = resultArray
        temp = temp.filter((item:any)=> item._id !== data._id)
        setResultArray(temp)
        setStatus(responseStatus);
        setToastMessage(response.data.message);
        setToastType("success");
      } else {
        
        setToastMessage(response.message);
        setToastType("error");
      }
      setToastOpen(true);
      setIsLoading(false);
      setDeleteDialog(false);
    });
  };

  return {
    toggleStatus,
    deleteTicket,
    toastOpen,
    setToastOpen,
    toastType,
    toastMessage,
    isLoading,
    deleteDialog,
    setDeleteDialog,
    status,
    openDetail,
    setOpenDetail,
  };
};

export default useTicketsTableRow;
