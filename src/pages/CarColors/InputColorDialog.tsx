import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Color, ColorPicker } from "material-ui-color";
import React, { useState } from "react";

interface InputColorDialogProps {
  title: string;
  value: string;
  open: boolean;
  helperText: string;
  label: string;
  handleConfirmation: () => void;
  handleRejection: () => void;
  handleChange: (e: any) => void;
  handleColorChange: (e: any) => void;
  confirmBtnLabel?: string;
  rejectBtnLabel?: string;
  textFieldName?: string;
  colorValue: any;
}
const InputColorDialog = ({
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
  colorValue,
  handleColorChange,
}: InputColorDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [error, setError] = useState(false);
  const [colorCodeError, setColorCodeError] = useState(false);

  const handleColorPicker = (newValue: Color) => {
    // console.log(newValue.hex)
    // return
    handleColorChange(`#${newValue.hex}`);
  };

  const reject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setError(false);
    setColorCodeError(false);
    handleRejection();
  };
  const confirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    let errorFlag = false;
    if (value === "") {
      setError(true);
      errorFlag = true;
    }
    if (!colorValue) {
      setColorCodeError(true);
      errorFlag = true;
    }
    if (errorFlag) {
      return;
    }
    setError(false);
    setColorCodeError(false);
    handleConfirmation();
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
          <Box
            marginTop="10px"
            display="flex"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <ColorPicker
              value={colorValue}
              onChange={handleColorPicker}
              disablePlainColor
              hideTextfield
            />
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
          </Box>
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

export default InputColorDialog;
