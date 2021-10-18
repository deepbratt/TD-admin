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
  ADS_VIEWS_LOGS_LIST,
  ACTION,
  FULL_NAME,
  PHONE,
  NOT_AVAILABLE,
  CLICKED_BY,
  CLICKED_DATE,
  AD_CLICKED,
  BUYER_PHONE,
} from "../../utils/constants/language/en/buttonLabels";
import SearchIcon from "@material-ui/icons/Search";
import { IViewsLogsTableRow } from "../../pages/adsViewsLogs";
import { Skeleton } from "@material-ui/lab";
import { DeleteRounded, EditRounded } from "@material-ui/icons";
import { useHistory } from "react-router";
import { paths } from "../../routes/paths";

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

interface IViewsLogsTableRowProps {
  data: IViewsLogsTableRow;
  handleUpdate: (_id: string) => void;
  handleDelete: (_id: string) => void;
}

export const Row: React.FC<IViewsLogsTableRowProps> = ({
  handleUpdate,
  handleDelete,
  data,
}) => {
  const history = useHistory();
  const { buyer_details, car_details, clickedDate, _id } = data;
  const { firstName, lastName, phone } = buyer_details;
  const { make, model, modelYear } = car_details;
  return (
    <TableRow>
      <TableCell
        style={{ cursor: "pointer" }}
        onClick={() => history.push(paths.userDetail + "/" + buyer_details._id)}
      >
        {firstName + " " + lastName}
      </TableCell>
      <TableCell>{phone ? phone : NOT_AVAILABLE}</TableCell>
      <TableCell
        style={{ cursor: "pointer" }}
        onClick={() => history.push(paths.carDetail + "/" + car_details._id)}
      >
        {make + " " + model + " (" + modelYear + ")"}
      </TableCell>
      <TableCell>{new Date(clickedDate).toLocaleDateString("en-US")}</TableCell>
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

interface IViewsLogsTableProps {
  data?: IViewsLogsTableRow[];
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

const ViewsLogsTable: React.FC<IViewsLogsTableProps> = ({
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
        <Typography variant="h3">{ADS_VIEWS_LOGS_LIST}</Typography>
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
            <TableCell>{CLICKED_BY}</TableCell>
            <TableCell>{BUYER_PHONE}</TableCell>
            <TableCell>{AD_CLICKED}</TableCell>
            <TableCell>{CLICKED_DATE}</TableCell>
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
            data.map((user: IViewsLogsTableRow) => (
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

export default ViewsLogsTable;
