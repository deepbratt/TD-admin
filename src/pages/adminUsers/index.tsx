import { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import CustomButton from "../../components/CustomButton";
import UserDialog from "../../sections/UserDialog";
import AdminTable from "../../sections/AdminTable";
import { getData } from "../../utils/API/APIs";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import {
  AD_USER,
  MANAGE_USER,
} from "../../utils/constants/language/en/buttonLabels";

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
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    await getData(USERS)
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        if (response && response.data && response.data.status === "success") {
          setUsers(response.data.data.result);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error", error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid
        item
        container
        xs={10}
        sm={8}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={9}>
          <Typography variant="h3">{MANAGE_USER}</Typography>
        </Grid>
        <Grid container item xs={12} sm={3} justifyContent="flex-end">
          <CustomButton color="secondary" onClick={() => setOpen(true)}>
            {AD_USER}
          </CustomButton>
          <UserDialog open={open} setOpen={setOpen} />
        </Grid>
      </Grid>
      <Grid item container xs={12} lg={10}>
        <AdminTable data={users} loading={isLoading} />
      </Grid>
    </Grid>
  );
};

export default AdminUsers;
