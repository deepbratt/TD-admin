import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import CustomDivider from "../../components/CustomDivider";
import HeaderSearch from "../../components/HeaderSearch";
import Loader from "../../components/Loader";
import SelectComponent from "../../components/SelectComponent";
import TableRowComponent from "../../components/TableRowComponent";
import Toast from "../../components/Toast";
import SecondaryLayout from "../../layout/SecondaryLayout";
import PageHeader from "../../sections/PageHeader";
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
  } = useUsers();
  return (
    <SecondaryLayout>
      <PageHeader heading="Users">
        <SelectComponent
          menuItem={["All", "Sellers"]}
          label="Type"
          name="userType"
          onChange={handleChange}
          value={filters.userType}
        />
        <SelectComponent
          menuItem={["All", "Active", "Inactive"]}
          label="Active"
          name="userActive"
          onChange={handleChange}
          value={filters.userActive}
        />
        <SelectComponent
          menuItem={["All", "Banned", "Unbanned"]}
          label="Banned"
          name="userBanned"
          onChange={handleChange}
          value={filters.userBanned}
        />
        <HeaderSearch setKeywords={setKeywords} getResults={getUsers} />
      </PageHeader>
      <CustomDivider />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>UserName</TableCell>
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
