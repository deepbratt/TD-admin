import { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import CustomButton from "../../components/CustomButton";
import UserDialog from "../../sections/UserDialog";
import AdminTable from "../../sections/AdminTable";
import { deleteData, getData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import {
  AD,
  USER,
  MANAGE_ADS_VIEWS_LOGS,
} from "../../utils/constants/language/en/buttonLabels";
import Toast from "../../components/Toast";
import ViewsLogsTable from "../../sections/ViewsLogsTable";

export interface IViewsLogsTableRow {
  _id: string;
  clickedDate: string;
  seller_details: string;
  buyer_details: {
    _id: string;
    firstName: string;
    lastName: string;
    phone?: string;
  };
  car_details: {
    _id: string;
    make: string;
    model: string;
    modelYear: string;
    id: string;
  };
  createdAt: string;
  updatedAt: string;
}

const AdsViewsLogs: React.FC = () => {
  const { ADS, CARS, ADS_VIEWS_LOGS } = API_ENDPOINTS;
  const [open, setOpen] = useState(false);
  const [viewsLogs, setViewsLogs] = useState<IViewsLogsTableRow[]>();
  const [userID, setUserID] = useState("");
  const [update, setUpdate] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  const handleUpdate = async (id: string) => {
    setUpdate(true);
    setUserID(id);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteData(ADS + CARS + ADS_VIEWS_LOGS + "/" + id)
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        if (response && response.data && response.data.status === "success") {
          setAlertOpen(true);
          setResponseMessage({
            status: "success",
            message: "User Deleted Successfully!",
          });
          getAdsViewsLogs();
        } else {
          setAlertOpen(true);
          setResponseMessage({
            status: "Error",
            message: response.message,
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setAlertOpen(true);
        setResponseMessage({
          status: "Error",
          message: error.message,
        });
        console.log("Error", error);
      });
  };

  const getAdsViewsLogs = async () => {
    setIsLoading(true);
    let params = "?";
    params = params + "limit=" + rowsPerPage;
    params = params + "&page=" + page;
    if (keywords !== "") {
      params = params + "&keyword=" + keywords;
    }
    await getData(ADS + CARS + ADS_VIEWS_LOGS + params)
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        if (response && response.data && response.data.status === "success") {
          setViewsLogs(response.data.data.result);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error", error);
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
          <Typography variant="h3">{MANAGE_ADS_VIEWS_LOGS}</Typography>
        </Grid>
        {/* <Grid container item xs={12} sm={3} justifyContent="flex-end">
          <CustomButton color="secondary" onClick={() => setOpen(true)}>
            {AD + " " + USER}
          </CustomButton>
          <UserDialog
            open={open}
            setOpen={setOpen}
            id={userID}
            update={update}
            setUpdate={setUpdate}
          />
        </Grid> */}
      </Grid>
      <Grid item container xs={12}>
        <ViewsLogsTable
          data={viewsLogs}
          loading={isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          keywords={keywords}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSearchInputChange={handleSearchInputChange}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
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
