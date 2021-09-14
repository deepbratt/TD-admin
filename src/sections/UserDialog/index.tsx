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
import { fieldNames } from "../../utils/constants/formsConstants";
import { useForm } from "./useForm";

interface IUserProps {
  open: boolean;
  setOpen: Function;
  update?: boolean;
  disableRole?:boolean
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
  update = false,
  disableRole= false
}) => {
  const { values, errors, handleInputChange, handleSubmit } = useForm(
    false,
    ""
  );
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="user-dialog-title"
    >
      <DialogTitle id="user-dialog-title">
        {update ? "Update " : "ADD "}USER
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
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
            {!disableRole && <Grid item xs={12}>
              <InputField
                select
                label="Role"
                name={fieldNames.role}
                value={values.role}
                error={errors.role}
                onChange={handleInputChange}
                disabled={disableRole}
              >
                {roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </InputField>
            </Grid>}
            <Grid item xs={12} sm={6}>
              <PasswordField
                label="Password"
                id="input-password"
                name={fieldNames.password}
                value={values.password}
                error={errors.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PasswordField
                label="Confirm Password"
                name={fieldNames.confirmPassword}
                value={values.confirmPassword}
                error={errors.confirmPassword}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <CustomButton type="submit" onClick={handleSubmit}>
          Add User
        </CustomButton>
        <CustomButton variant="text" onClick={() => setOpen(false)}>
          Close
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
