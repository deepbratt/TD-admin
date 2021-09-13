import { useState } from "react";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Divider,
  InputBase,
  TableBody,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import {
  alpha,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import {
  ADMIN_USER_LIST,
  ACTION,
  USERNAME,
  FULL_NAME,
  EMAIL_PHONE,
  ROLE,
} from "../../utils/constants/language/en/buttonLabels";
import SearchIcon from "@material-ui/icons/Search";
import { IUserTableRow } from "../../pages/adminUsers";
import { Skeleton } from "@material-ui/lab";

const TableStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: theme.palette.primary.main,
      "& > h3": {
        color: theme.palette.common.white,
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.common.white,
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
      color: theme.palette.common.white,
    },
  })
);

export const Row: React.FC<IUserTableRow> = (props) => {
  const { username, firstName, lastName, email, phone, role, _id } = props;
  return (
    <TableRow>
      <TableCell>{username}</TableCell>
      <TableCell>{firstName + lastName}</TableCell>
      <TableCell>{email ? email : phone}</TableCell>
      <TableCell>{role}</TableCell>
      <TableCell align="center">{ACTION}</TableCell>
    </TableRow>
  );
};

interface IUserTableProps {
  data?: IUserTableRow[];
  loading: boolean;
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdminTable: React.FC<IUserTableProps> = ({
  data,
  loading,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const { toolbar, search, searchIcon, inputRoot, inputInput } = TableStyles();

  return (
    <TableContainer component={Paper}>
      <Toolbar className={toolbar}>
        <Typography variant="h3">{ADMIN_USER_LIST}</Typography>
        <div className={search}>
          <div className={searchIcon}>
            <SearchIcon color="inherit" />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: inputRoot,
              input: inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Toolbar>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{USERNAME}</TableCell>
            <TableCell>{FULL_NAME}</TableCell>
            <TableCell>{EMAIL_PHONE}</TableCell>
            <TableCell>{ROLE}</TableCell>
            <TableCell align="center">{ACTION}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <>
              {[...Array(rowsPerPage)].map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="rect" width="100%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rect" width="100%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rect" width="100%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rect" width="100%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rect" width="100%" />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            data && data.map((user: IUserTableRow) => <Row {...user} />)
          )}
        </TableBody>
      </Table>
      {data && (
        <>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </TableContainer>
  );
};

export default AdminTable;
