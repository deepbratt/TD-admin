import { useHistory } from "react-router-dom";
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
  // InputBase,
  TableBody,
  TablePagination,
  Link,
  IconButton,
} from "@material-ui/core";
import InformationDialog from "../../components/InformationDialog";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import {
  alpha,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import {
  CANT_FIND_RESULT,
  BULK_UPLOADS_LIST,
  // ID,
  USER_ID,
  CREATED_BY,
  CREATED_DATE,
  TOTAL_ADS_COUNT,
  SUCCESS_ADS_COUNT,
  FAILED_ADS_COUNT,
  CSV_FILE,
  STATUS,
  NOT_AVAILABLE,
  CLOSE,
} from "../../utils/constants/language/en/buttonLabels";
// import SearchIcon from "@material-ui/icons/Search";
import { IBulkUploadHistoryTableRow } from "../../pages/bulkUpload";
import { Skeleton } from "@material-ui/lab";
import { paths } from "../../routes/paths";
import { useState } from "react";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import { getData } from "../../utils/API/APIs";

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

interface IBulkUploadHistoryTableRowProps {
  data: IBulkUploadHistoryTableRow;
}

interface IBulkUploadStats extends IBulkUploadHistoryTableRowProps {
  failedReason: string;
}
export const Row: React.FC<IBulkUploadHistoryTableRowProps> = ({ data }) => {
  const { ADS, CARS, BULK_ADS_STATS } = API_ENDPOINTS;
  const [open, setOpen] = useState(false);
    useState<IBulkUploadHistoryTableRowProps | null>(null);

  const history = useHistory();
  const {
    userId,
    createdAt,
    createdBy,
    csvFile,
    status,
    totalAdsCount,
    successAdsCount,
    failedAdsCount,
    failedAds,
  } = data;

  let informationDialogProps = {
    open: open,
    setOpen: setOpen,
    title: "Ads Failed To Upload",
    actionBtnLabel: CLOSE,
  };

  const { firstName, lastName } = createdBy;
  return (
    <TableRow>
      {/* <TableCell>{_id}</TableCell> */}
      <TableCell>
        <Link
          style={{ cursor: "pointer" }}
          onClick={() => history.push(paths.userDetail + "/" + userId)}
        >{`${userId}`}</Link>
      </TableCell>
      <TableCell>
        <Link
          style={{ cursor: "pointer" }}
          onClick={() => history.push(paths.userDetail + "/" + createdBy._id)}
        >{`${firstName} ${lastName}`}</Link>
      </TableCell>
      <TableCell>
        {csvFile ? (
          <Link href={csvFile}>{csvFile.slice(0, 40)}...</Link>
        ) : (
          <>{NOT_AVAILABLE}</>
        )}
      </TableCell>
      <TableCell>{totalAdsCount ? totalAdsCount : 0}</TableCell>
      <TableCell>{successAdsCount ? successAdsCount : 0}</TableCell>
      <TableCell>
        {failedAds && failedAdsCount && failedAdsCount > 0 ? (
          <>
            {failedAdsCount}
            <IconButton
              size="small"
              onClick={() => setOpen(true)}
            >
              <HelpOutlineRoundedIcon fontSize="small" />
            </IconButton>
            <InformationDialog
              failedAds={JSON.parse(failedAds)}
              {...informationDialogProps}
            />
          </>
        ) : (
          0
        )}
      </TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>
        {new Date(createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </TableCell>
    </TableRow>
  );
};

interface IBulkUploadHistoryTableProps {
  data?: IBulkUploadHistoryTableRow[];
  loading: boolean;
  count: number | null;
  page: number;
  rowsPerPage: number;
  keywords: string;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchInputChange: (e: any) => void;
}

const BulkUploadHistoryTable: React.FC<IBulkUploadHistoryTableProps> = ({
  data,
  loading,
  count,
  page,
  rowsPerPage,
  keywords,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSearchInputChange,
}) => {
  const {
    toolbar,
    // search, searchIcon, inputRoot, inputInput
  } = TableStyles();

  return (
    <TableContainer component={Paper}>
      <Toolbar className={toolbar}>
        <Typography variant="h3">{BULK_UPLOADS_LIST}</Typography>
        {/* <div className={search}>
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
        </div> */}
      </Toolbar>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell>{ID}</TableCell> */}
            <TableCell>{USER_ID}</TableCell>
            <TableCell>{CREATED_BY}</TableCell>
            <TableCell>{CSV_FILE}</TableCell>
            <TableCell>{TOTAL_ADS_COUNT}</TableCell>
            <TableCell>{SUCCESS_ADS_COUNT}</TableCell>
            <TableCell>{FAILED_ADS_COUNT}</TableCell>
            <TableCell>{STATUS}</TableCell>
            <TableCell>{CREATED_DATE}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <>
              {[...Array(rowsPerPage)].map((item, index) => (
                <TableRow key={index}>
                  {[...Array(8)].map((item, index) => (
                    <TableCell key={index}>
                      <Skeleton variant="rect" width="100%" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ) : (
            data &&
            data.map((user: IBulkUploadHistoryTableRow) => <Row data={user} />)
          )}
        </TableBody>
      </Table>
      {count && !(count > 0) && (
        <Typography
          style={{ width: "100%", margin: "20px 0" }}
          align="center"
          variant="h2"
        >
          {CANT_FIND_RESULT}
        </Typography>
      )}
      {data && (
        <>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={count ? count : 0}
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

export default BulkUploadHistoryTable;
