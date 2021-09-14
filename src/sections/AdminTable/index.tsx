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
  TablePagination,
  IconButton,
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
  EMAIL,
  PHONE,
  NOT_AVAILABLE,
  ROLE,
} from "../../utils/constants/language/en/buttonLabels";
import SearchIcon from "@material-ui/icons/Search";
import { IUserTableRow } from "../../pages/adminUsers";
import { Skeleton } from "@material-ui/lab";
import { DeleteRounded, EditRounded } from "@material-ui/icons";

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

interface IUserTableRowProps {
  data: IUserTableRow;
  handleUpdate: (_id: string) => void;
  handleDelete: (_id: string) => void;
}

export const Row: React.FC<IUserTableRowProps> = ({
  handleUpdate,
  handleDelete,
  data,
}) => {
  const { username, firstName, lastName, email, phone, role, _id } = data;
  return (
    <TableRow>
      <TableCell>{username}</TableCell>
      <TableCell>{firstName + " " + lastName}</TableCell>
      <TableCell>{email ? email : NOT_AVAILABLE}</TableCell>
      <TableCell>{phone ? phone : NOT_AVAILABLE}</TableCell>
      <TableCell>{role}</TableCell>
      <TableCell align="center">
        <IconButton onClick={() => handleUpdate(_id)}>
          <EditRounded color="primary" />
        </IconButton>
        <IconButton onClick={() => handleDelete(_id)}>
          <DeleteRounded style={{ color: "#C20000" }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

interface IUserTableProps {
  data?: IUserTableRow[];
  loading: boolean;
  page: number;
  rowsPerPage: number;
  keywords: string;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchInputChange: (e: any) => void;
  handleUpdate: (_id: string) => void;
  handleDelete: (_id: string) => void;
}

const AdminTable: React.FC<IUserTableProps> = ({
  data,
  loading,
  page,
  rowsPerPage,
  keywords,
  handleUpdate,
  handleDelete,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSearchInputChange,
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
            onKeyPress={handleSearchInputChange}
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
            <TableCell>{EMAIL}</TableCell>
            <TableCell>{PHONE}</TableCell>
            <TableCell>{ROLE}</TableCell>
            <TableCell align="center">{ACTION}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <>
              {[...Array(rowsPerPage)].map((item, index) => (
                <TableRow key={index}>
                  {[...Array(6)].map((item, index) => (
                    <TableCell key={index}>
                      <Skeleton variant="rect" width="100%" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ) : (
            data &&
            data.map((user: IUserTableRow) => (
              <Row
                data={user}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
      {data && (
        <>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
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
