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
} from "@material-ui/core";
import {
  alpha,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import {
  ACTION,
  AD_ID,
  MAKE_MODEL,
  STATUS,
  USER_IMAGE,
} from "../../utils/constants/language/en/buttonLabels";
import SearchIcon from "@material-ui/icons/Search";

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

const DashboardTable: React.FC = () => {
  const { toolbar, search, searchIcon, inputRoot, inputInput } = TableStyles();
  return (
    <TableContainer component={Paper}>
      <Toolbar className={toolbar}>
        <Typography variant="h3">
          Car Bookings
        </Typography>
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
            <TableCell>{AD_ID}</TableCell>
            <TableCell>{USER_IMAGE}</TableCell>
            <TableCell>{MAKE_MODEL}</TableCell>
            <TableCell>{STATUS}</TableCell>
            <TableCell align="center">{ACTION}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default DashboardTable;
