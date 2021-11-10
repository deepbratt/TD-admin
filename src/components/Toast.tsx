import { useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
interface IProp {
  open: boolean;
  message: string;
  onClose: Function;
  type: string;
}
const Alert = (props: any) => (
  <MuiAlert elevation={0} variant="filled" {...props} />
);

const Toast = ({ open, message, type, onClose }: IProp) => {

  const closeToast = (e: React.SyntheticEvent<Element, Event>) => {
    // e.stopPropagation();
    onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      onClose={(e: React.SyntheticEvent<Element, Event>) => closeToast(e)}
      open={open}
      autoHideDuration={3000}
      disableWindowBlurListener
    >
      <Alert
        onClose={(e: React.SyntheticEvent<Element, Event>) => closeToast(e)}
        severity={type}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
