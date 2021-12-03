import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import {
  AD_FAILED,
  REASON,
  REG_NUMBER,
} from "../utils/constants/language/en/buttonLabels";
import { ICarCard } from "../utils/interfaces/CarAds.interface";

const TableStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      backgroundColor: theme.palette.primary.main,
    },
    headCells: {
      color: theme.palette.common.white,
      whiteSpace: "nowrap",
    },
    bodyCells:{
      whiteSpace: "nowrap",
    }
  })
);

interface IFailedAds extends ICarCard {
  failedReason: string[];
  regNumber: string;
}

interface DialogComponentProps {
  title: string;
  message?: string | any;
  open: boolean;
  failedAds?: IFailedAds[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  actionBtnLabel?: string;
  actionBtnFunc?: () => void;
}
const InformationDialog = ({
  title,
  message,
  open,
  setOpen,
  failedAds,
  actionBtnLabel = "OK",
  actionBtnFunc,
}: DialogComponentProps) => {
  const { toolbar, headCells, bodyCells } = TableStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClose = () => {
    setOpen(false);
    if (actionBtnFunc) {
      actionBtnFunc();
    }
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      maxWidth={"sm"}
      fullWidth={true}
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {failedAds && (
          <TableContainer component={Paper}>
            <TableHead className={toolbar}>
              <TableRow>
                <TableCell className={headCells}>{REG_NUMBER}</TableCell>
                <TableCell className={headCells}>{AD_FAILED}</TableCell>
                <TableCell className={headCells}>{REASON}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {failedAds.map((failedAd) => (
                <TableRow key={failedAd._id}>
                  <TableCell className={bodyCells}>{`${failedAd.regNumber}`}</TableCell>
                  <TableCell className={bodyCells}>{`${failedAd.model} ${failedAd.make} ${failedAd.modelYear}`}</TableCell>
                  <TableCell>{failedAd.failedReason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        )}
        {message && <DialogContentText>{message}</DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          autoFocus
          variant="contained"
        >
          {actionBtnLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InformationDialog;
