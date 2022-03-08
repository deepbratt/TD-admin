import { useEffect, useState } from "react";
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import {
  setFilter,

} from '../../redux/reducers/carFiltersSlice';

const useAdvertisements = (createdBy?: string) => {
  const dataLimit = 10;
  const dispatch = useDispatch();
  const carFilters = useSelector(
    (state: RootState) => state.carFilters.filters
  );
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [keywords, setKeywords] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'condition' && value === 'any') {
      let filter = {
        name: name,
        value: ''
      };
      dispatch(setFilter(filter));
    } else {
      let filter = {
        name: name,
        value: value
      };
      dispatch(setFilter(filter));
    }
  };

  // functions
  const getCars = (pageValue = page) => {
    setIsLoading(true);
    let endpoint = `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}?limit=${dataLimit}&page=${pageValue}`;
    endpoint += keywords ? "&keyword=" + keywords : "";
    endpoint += createdBy ? "&createdBy=" + createdBy : "";
    endpoint += carFilters.sort !== "" ? "&sort=" + carFilters.sort : "";
    getData(endpoint)
      .then((response: any) => {
        window.scrollTo(0, 0);
        if (response && response.data && response.data.status === "success") {
          setData(response.data);
          setResult(response.data.data.result);
          setPage(pageValue);
          setTotalCount(response.data.totalCount)
          let totalPages = Math.ceil(response.data.totalCount / dataLimit);
          setPageCount(totalPages);
        } else {
          setToastMessage(response.data.message);       
          setToastOpen(true);
          setToastType("error");
        }
      })
      .then(() => setIsLoading(false));
  };

  //   useEffects
  useEffect(() => {
    getCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, carFilters]);

  //   return
  return {
    data,
    result,
    page,
    handleInputChange,
    isLoading,
    reload,
    setReload,
    toastMessage,
    toastOpen,
    toastType,
    setToastOpen,
    setPage,
    pageCount,
    keywords,
    setKeywords,
    getCars,
    totalCount
  };
};

export default useAdvertisements;
