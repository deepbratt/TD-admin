import { useEffect, useReducer, useState } from "react";
import { getData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const initialFieldValues = {
  userType: "All",
  userActive: "All",
  userBanned: "All",
};

const useUsers = () => {
  const dataLimit = 10;
  const [data, setData] = useState();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [result, setResult] = useState<Array<any>>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [keywords, setKeywords] = useState("");
  const [filters, setFilters] = useReducer(formReducer, initialFieldValues);

  // functions
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

  const getUsers = (pageValue = page) => {
    setIsLoading(true);
    let endpoint = `${API_ENDPOINTS.USERS}?role=User&limit=${dataLimit}&page=${pageValue}`;
    endpoint += keywords ? "&keyword=" + keywords : "";
    endpoint +=
      filters.userActive === "All"
        ? ""
        : filters.userActive === "Active"
        ? "&active=" + true
        : "&active=" + false;
    endpoint +=
      filters.userBanned === "All"
        ? ""
        : filters.userBanned === "Banned"
        ? "&banned=" + true
        : "&banned=" + false;
    endpoint =
      filters.userType === "Sellers"
        ? API_ENDPOINTS.ADS + API_ENDPOINTS.CARS + API_ENDPOINTS.OWNERS
        : endpoint;
    getData(endpoint)
      .then((response: any) => {
        
        window.scrollTo(0, 0);
        if (response && response.data && response.data.status === "success") {
          setData(response.data);
          setResult(response.data.data.result);
          setPage(pageValue);
          // ("response pages count= ", response.data.totalCount);
          let totalPages = Math.ceil(response.data.totalCount / dataLimit);
          setPageCount(totalPages);
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

  //   useEffects
  useEffect(() => {
    getUsers(1);
  }, [filters]);

  //   return
  return {
    data,
    result,
    setResult,
    page,
    isLoading,
    toastMessage,
    toastOpen,
    toastType,
    setToastOpen,
    setPage,
    pageCount,
    keywords,
    setKeywords,
    getUsers,
    handleChange,
    filters,
    setFilters,
    setOpenAddDialog,
    openAddDialog,
  };
};
export default useUsers;
