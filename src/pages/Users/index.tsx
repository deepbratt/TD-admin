import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import CustomDivider from "../../components/CustomDivider";
import HeaderSearch from "../../components/HeaderSearch";
import Loader from "../../components/Loader";
import NoResults from "../../components/NoResults";
import SelectComponent from "../../components/SelectComponent";
import TableRowComponent from "../../components/TableRowComponent";
import Toast from "../../components/Toast";
import SecondaryLayout from "../../layout/SecondaryLayout";
import PageHeader from "../../sections/PageHeader";
import UserDialog from "../../sections/UserDialog";
import useUsers from "./useUsers";

const Users = () => {
  const {
    result,
    isLoading,
    toastMessage,
    toastOpen,
    toastType,
    setToastOpen,
    pageCount,
    setKeywords,
    getUsers,
    handleChange,
    filters,
    setFilters,
    setOpenAddDialog,
    openAddDialog
  } = useUsers();
  const classes = styles();
  return (
    <SecondaryLayout>
      <PageHeader heading="Users">
        <SelectComponent
          menuItem={["All", "Sellers"]}
          label="Type"
          name="userType"
          onChange={handleChange}
          value={filters.userType}
          InputProps={{
            classes: {
              input: classes.inputStyle,
            },
          }}
        />
        <SelectComponent
          menuItem={["All", "Active", "Inactive"]}
          label="Active"
          name="userActive"
          onChange={handleChange}
          value={filters.userActive}
          InputProps={{
            classes: {
              input: classes.inputStyle,
            },
          }}
        />
        <SelectComponent
          menuItem={["All", "Banned", "Unbanned"]}
          label="Ban"
          name="userBanned"
          onChange={handleChange}
          value={filters.userBanned}
          InputProps={{
            classes: {
              input: classes.inputStyle,
            },
          }}
        />
        <HeaderSearch setKeywords={setKeywords} getResults={getUsers} />
        <Button endIcon={<Add />} variant="contained" color="secondary" onClick={()=>setOpenAddDialog(true)}>
          ADD User
        </Button>
      </PageHeader>
      <CustomDivider />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((row: any, index: number) => (
              <TableRowComponent data={row} key={row._id + index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
            {result.length < 1 && <NoResults/>}
      <Grid container>
        <Grid
          item
          xs={12}
          style={{ display: "flex", marginTop: 5 }}
          justifyContent="flex-end"
        >
          <Pagination
            count={pageCount}
            onChange={(event, value) => getUsers(value)}
            color="secondary"
          />
        </Grid>
      </Grid>
      <UserDialog open={openAddDialog} setOpen={setOpenAddDialog} disableRole/>
      <Loader open={isLoading} isBackdrop={true} />
      <Toast
        onClose={() => setToastOpen(false)}
        open={toastOpen}
        message={toastMessage}
        type={toastType}
      />
    </SecondaryLayout>
  );
};

export default Users;

const styles = makeStyles({
  inputStyle: {
    padding: "5px",
  },
});
