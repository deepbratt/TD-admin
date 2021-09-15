import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { useState } from "react";
import NoImg from "../assets/icons/no-img.png";

interface InputDialogProps {
  title: string;
  value: string;
  open: boolean;
  helperText: string;
  label: string;
  handleConfirmation: () => void;
  handleRejection: () => void;
  handleChange: (e: any) => void;
  confirmBtnLabel?: string;
  rejectBtnLabel?: string;
  textFieldName?: string;
  imageFieldName?: string;
  imageValue?: any;
  withImage?: boolean;
}
const InputDialog = ({
  title,
  value,
  handleConfirmation,
  handleRejection,
  helperText = "This field is required",
  open,
  confirmBtnLabel = "Submit",
  rejectBtnLabel = "Cancel",
  handleChange,
  label,
  textFieldName = "name",
  imageFieldName = "image",
  imageValue,
  withImage = false,
}: InputDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [error, setError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const reject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setError(false);
    setImageError(false);
    handleRejection();
  };
  const confirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    let errorFlag = false;
    if (value === "") {
      setError(true);
      errorFlag = true;
    }
    if (withImage && !imageValue) {
      setImageError(true);
      errorFlag = true;
    }
    if (errorFlag) {
      return;
    }
    setError(false);
    setImageError(false);
    handleConfirmation();
  };
  const imageRender = () => {
    if (imageValue && typeof imageValue === "string") {
      return imageValue;
    } else if (imageValue && typeof imageValue !== "string") {
      return URL.createObjectURL(imageValue);
    } else {
      return NoImg;
    }
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={reject}
      aria-labelledby="responsive-dialog-title"
      maxWidth={"sm"}
      fullWidth={true}
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {withImage && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <div style={{width:"200px", position:"relative",}}>
                <img
                  src={imageRender()}
                  style={{ width: "100%", height: "auto", }}
                  alt=""
                />
                <IconButton
                  style={{
                    position: "absolute",
                    top: -10,
                    right: -35,
                    cursor: "pointer",
                  }}
                  title="Upload New"
                >
                  <input
                    name={imageFieldName}
                    type="file"
                    onChange={handleChange}
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      cursor: "pointer",
                      opacity: 0,
                    }}
                  />
                  <Edit />
                </IconButton>
              </div>
              {imageError && (
                <Typography variant="body2" color="error">
                  {helperText}
                </Typography>
              )}
            </div>
          )}
          <TextField
            name={textFieldName}
            fullWidth
            value={value}
            label={label}
            required
            error={error}
            helperText={error ? helperText : ""}
            onChange={handleChange}
          />
        </DialogContentText>
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

export default InputDialog;
