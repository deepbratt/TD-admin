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
  MANAGE_USER,
} from "../../utils/constants/language/en/buttonLabels";
import Toast from "../../components/Toast";

export interface IUserTableRow {
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  role: string;
  _id: string;
  active: boolean;
  ban: boolean;
  dateOfBirth: string;
  createdAt: string;
  gender: string;
  signedUpWithEmail: string;
  signedUpWithPhone: string;
  updatedAt: string;
}

const AdminUsers: React.FC = () => {
  const { USERS } = API_ENDPOINTS;
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<IUserTableRow[]>();
  const [userID, setUserID] = useState("");
  const [update, setUpdate] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
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
    await deleteData(USERS + "/" + id)
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        if (response && response.data && response.data.status === "success") {
          setAlertOpen(true);
          setResponseMessage({
            status: "success",
            message: "User Deleted Successfully!",
          });
          getUsers();
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

  const getUsers = async () => {
    setIsLoading(true);
    let params = "?";
    params = params + "limit=" + rowsPerPage;
    params = params + "&page=" + page;
    if (keywords !== "") {
      params = params + "&keyword=" + keywords;
    }
    await getData(USERS + params)
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        if (response && response.data && response.data.status === "success") {
          setUsers(response.data.data.result);
          setCount(response.data.totalCount);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error", error);
      });
  };

  useEffect(() => {
    getUsers();
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
          <Typography variant="h3">{MANAGE_USER}</Typography>
        </Grid>
        <Grid container item xs={12} sm={3} justifyContent="flex-end">
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
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        <AdminTable
          data={users}
          loading={isLoading}
          count={count}
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

export default AdminUsers;
