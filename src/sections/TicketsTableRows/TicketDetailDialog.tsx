import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import moment from "moment";
import React from "react";

interface DialogComponentProps {
  title: string;
  open: boolean;
  detail: any;
  status: string;
  handleConfirmation: () => void;
  handleRejection: () => void;
  confirmBtnLabel?: string;
  rejectBtnLabel?: string;
}
const TicketDetailDialog = ({
  title,
  status,
  handleConfirmation,
  handleRejection,
  open,
  confirmBtnLabel = "Agree",
  rejectBtnLabel = "Disagree",
  detail,
}: DialogComponentProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const reject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    handleRejection();
  };
  const confirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    handleConfirmation();
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleRejection}
      aria-labelledby="responsive-dialog-title"
      maxWidth={"sm"}
      fullWidth={true}
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{`type: ${detail.type}`}</DialogContentText>
        <DialogContentText>{`Status: ${status}`}</DialogContentText>
        <DialogContentText>
          {`Opened: ${moment(detail.createdAt).format("DD MMMM YYYY")}`}
        </DialogContentText>
        <DialogContentText>
          {`Closed: `}
          {status === "opened"
            ? "Not Yet"
            : moment(detail.closedAt).format("DD MMMM YYYY")}
        </DialogContentText>
          <DialogContentText>{`Email: ${detail.email ? detail.email : "Not Available"}`}</DialogContentText>
          <DialogContentText>{`Phone: ${detail.phone ? detail.phone : "Not Available"}`}</DialogContentText>
        <DialogContentText>{`Description: ${detail.description}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={(e) => reject(e)}
          color="secondary"
          variant="outlined"
        >
          {rejectBtnLabel}
        </Button>
        <Button
          onClick={(e) => confirm(e)}
          color="primary"
          autoFocus
          variant="contained"
        >
          {confirmBtnLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TicketDetailDialog;
