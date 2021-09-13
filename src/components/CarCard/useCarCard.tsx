import { useState } from "react";
import { deleteData, updateData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";

const useCarCard = (data: any) => {
  const [isBanned, setIsBanned] = useState(data.banned);
  const [isActive, setIsActive] = useState(data.active);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const toggleBan = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    let banUnban = isBanned ? API_ENDPOINTS.MARK_UNBAN : API_ENDPOINTS.MARK_BAN;
    setIsLoading(true);
    updateData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${banUnban}/${data._id}`
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

  const toggleActive = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    let activeInactive = isActive
      ? API_ENDPOINTS.MARK_INACTIVE
      : API_ENDPOINTS.MARK_ACTIVE;
    setIsLoading(true);
    updateData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${activeInactive}/${data._id}`
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
    deleteData(`${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}/${data._id}`).then(
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
        setDeleteDialog(false);
      }
    );
  };

  return {
    isActive,
    toggleActive,
    toggleBan,
    deleteAd,
    isBanned,
    toastOpen,
    setToastOpen,
    toastType,
    toastMessage,
    isLoading,
    deleteDialog,
    setDeleteDialog,
  };
};

export default useCarCard;
