import { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
} from "@material-ui/core";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import PasswordField from "../../components/InputField/PasswordField";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";

import { fieldNames } from "../../utils/constants/formsConstants";
import { useForm } from "./useForm";

interface IUserProps {
  open: boolean;
  setOpen: Function;
  setUpdate: Function;
  update?: boolean;
  id: string;
}

const roles = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "Moderator",
    label: "Moderator",
  },
  {
    value: "User",
    label: "User",
  },
];

const UserDialog: React.FC<IUserProps> = ({
  open,
  setOpen,
  setUpdate,
  update = false,
  id,
}) => {
  const {
    values,
    errors,
    isLoading,
    responseMessage,
    handleInputChange,
    handleSubmit,
    handleUpdateSubmit,
    alertOpen,
    setAlertOpen,
    handleClose,
    getUserData,
  } = useForm(false, setOpen, setUpdate);

  const handleAlertClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };
  useEffect(() => {
    if (update === true) {
      getUserData(id);
    }
  }, [id, update]);

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="user-dialog-title"
    >
      <DialogTitle id="user-dialog-title">
        {update ? "UPDATE " : "ADD "}USER
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <div style={{ minHeight: "50px" }}>
            <Loader open={true} />
          </div>
        ) : (
          <form>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <InputField
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  error={errors.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  label="Last Name"
                  name={fieldNames.lastName}
                  value={values.lastName}
                  error={errors.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  label="Username"
                  name={fieldNames.username}
                  value={values.username}
                  error={errors.username}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  label="Email/ Mobile"
                  name={fieldNames.data}
                  value={values.data}
                  error={errors.data}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  select
                  label="Role"
                  name={fieldNames.role}
                  value={values.role}
                  error={errors.role}
                  onChange={handleInputChange}
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </InputField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <PasswordField
                  label="Password"
                  disabled={update}
                  name={fieldNames.password}
                  value={values.password}
                  error={errors.password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <PasswordField
                  label="Confirm Password"
                  disabled={update}
                  name={fieldNames.confirmPassword}
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <CustomButton
          type="submit"
          disabled={isLoading}
          onClick={(e: any) =>
            !update ? handleSubmit(e) : handleUpdateSubmit(e, id)
          }
        >
          {update ? "UPDATE " : "ADD "}USER
        </CustomButton>
        <CustomButton
          disabled={isLoading}
          variant="text"
          onClick={() => handleClose()}
        >
          Close
        </CustomButton>
      </DialogActions>
      {responseMessage.status !== "" && (
        <Toast
          open={alertOpen}
          onClose={handleAlertClose}
          type={responseMessage.status}
          message={responseMessage.message}
        />
      )}
    </Dialog>
  );
};

export default UserDialog;
