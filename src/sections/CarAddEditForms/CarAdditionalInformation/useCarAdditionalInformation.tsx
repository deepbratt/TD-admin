import { useState } from "react";
import { getData } from "../../../utils/API/APIs";
import { API_ENDPOINTS } from "../../../utils/API/endpoints";

const useCarAdditionalInformation = (
  formData: any,
  setFormData: React.Dispatch<any>
) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [toastOpen, setToastOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeCheckBoxes = (e: any) => {
    let temp = formData.features;
    if (e.target.checked) {
      temp.push(e.target.name);
    } else {
      temp = temp.filter((item: string) => item !== e.target.name);
    }
    // console.log(e.target.name)
    setFormData({ name: "features", value: temp });
    // setFormData({ name: arrayName, value: temp });
    console.log(temp);
  };

  return { handleChangeCheckBoxes };
};

export default useCarAdditionalInformation;
