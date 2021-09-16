import { useEffect, useReducer, useState } from "react";
import { getData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import { isResponseSuccess } from "../../utils/functions/helperFunctions";

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const initialFieldValues = {
  ticketType: "All",
  ticketStatus: "All",
};

const useTickets = () => {
  const dataLimit = 5;
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState();
  const [result, setResult] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [filters, setFilters] = useReducer(formReducer, initialFieldValues); // const [phoneRequiredDialog, setPhoneRequiredDialog] = useState(false);

  //   functions
  const handleChange = (event: any) => {
    setFilters({
      name: event.target.name,
      value:
        event.target.name === "image"
          ? event.target.files[0]
          : event.target.value,
    });
    event.target.value = event.target.name === "image" && null;
  };
  // apis
  const getTickets = (pageValue = page) => {
    setIsLoading(true);
    let endpoint = `${API_ENDPOINTS.TICKETS}?limit=${dataLimit}&page=${pageValue}`;
    endpoint += keywords ? "&keyword=" + keywords : "";
    endpoint +=
      filters.ticketStatus === "All" ? "" : "&status=" + filters.ticketStatus;
    endpoint +=
      filters.ticketType === "All" ? "" : "&type=" + filters.ticketType;
    getData(endpoint)
      .then((response) => {
        let responseResult = isResponseSuccess(response);
        if (responseResult.success) {
          console.log(response);
          window.scrollTo(0, 0);
          setPage(pageValue);
          let totalPages = Math.ceil(response.data.totalCount / dataLimit);
          setPageCount(totalPages);
          setData(response);
          setResult(response.data.data.result);
        } else {
          setResult([]);
          setToastOpen(true);
          setToastMessage(responseResult.message);
          setToastType("error");
        }
      })
      .then(() => setIsLoading(false));
  };

  // useEffects
  useEffect(() => {
    getTickets(1);
  }, [filters]);

  return {
    data,
    isLoading,
    toastMessage,
    toastOpen,
    setToastOpen,
    toastType,
    setDeleteDialog,
    deleteDialog,
    result,
    setResult,
    setPage,
    pageCount,
    page,
    getTickets,
    handleChange,
    filters,
    keywords,
    setKeywords,
  };
};

export default useTickets;
