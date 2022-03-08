import { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { deleteData, getData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import {
  MANAGE_ALL_ADS_VIEWS_LOGS,
  MANAGE_SELECTED_ADS_VIEWS_LOGS,
} from "../../utils/constants/language/en/buttonLabels";
import Toast from "../../components/Toast";
import ViewsLogsTable from "../../sections/ViewsLogsTable";
import { useParams } from "react-router";

export interface IViewsLogsTableRow {
  _id: string;
  clickedDate: string;
  seller_details: string;
  buyer_details: {
    _id: string;
    firstName: string;
    lastName: string;
    phone?: string;
  } | null;
  car_details: {
    _id: string;
    make: string;
    model: string;
    modelYear: string;
    id: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

const AdsViewsLogs: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { ADS, CARS, ADS_VIEWS_LOGS, ADS_VIEWS_LOGS_OF_SINGLE_AD } =
    API_ENDPOINTS;
  const [open, setOpen] = useState(false);
  const [viewsLogs, setViewsLogs] = useState<IViewsLogsTableRow[]>();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [keywords, setKeywords] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    status: "",
    message: "",
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchInputChange = (e: any) => {
    if (e.key === "Enter") {
      setKeywords(e.target.value);
    }
  };

  const handleAlertClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const getAdsViewsLogs = async () => {
    setIsLoading(true);
    let params = ADS_VIEWS_LOGS + "?";
    params = params + "limit=" + rowsPerPage;
    params = params + "&page=" + page;
    if (keywords !== "") {
      params = params + "&keyword=" + keywords;
    }
    if (id) {
      params = "";
      params = ADS_VIEWS_LOGS + ADS_VIEWS_LOGS_OF_SINGLE_AD + "/" + id;
    }
    await getData(ADS + CARS + params)
      .then((response) => {
        setIsLoading(false);
        
        if (response && response.data && response.data.status === "success") {
          setViewsLogs(response.data.data.result);
          setTotalCount(response.data.totalCount);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        
      });
  };

  useEffect(() => {
    getAdsViewsLogs();
  }, [page, rowsPerPage, keywords, open]);

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid
        item
        container
        xs={12}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={9}>
          <Typography variant="h3">
            {id ? MANAGE_SELECTED_ADS_VIEWS_LOGS : MANAGE_ALL_ADS_VIEWS_LOGS}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        <ViewsLogsTable
          data={viewsLogs}
          loading={isLoading}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          keywords={keywords}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSearchInputChange={handleSearchInputChange}
        />
      </Grid>
      {responseMessage.status !== "" && (
        <Toast
          open={alertOpen}
          onClose={handleAlertClose}
          type={responseMessage.status}
          message={responseMessage.message}
        />
      )}
    </Grid>
  );
};

export default AdsViewsLogs;
