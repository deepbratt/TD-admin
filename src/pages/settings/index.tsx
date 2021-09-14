import { useForm } from "./useForm";
import {
  Grid,
  Typography,
  MenuItem,
  Paper,
  makeStyles,
  Divider,
} from "@material-ui/core";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import PasswordField from "../../components/InputField/PasswordField";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import { fieldNames } from "../../utils/constants/formsConstants";
import {
  ADMIN_USER,
  UPDATE,
  PROFILE,
  PASSWORD,
} from "../../utils/constants/language/en/buttonLabels";
import { useParams } from "react-router";

const SettingsStyles = makeStyles((theme) => ({
  root: {
    padding: "30px",
  },
}));

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

const Settings: React.FC = () => {
  const { root } = SettingsStyles();
  const {
    values,
    errors,
    isLoading,
    responseMessage,
    handleInputChange,
    handleSubmit,
    handlePasswordUpdate,
    alertOpen,
    setAlertOpen,
  } = useForm(false);

  const { id } = useParams<any>();

  const handleAlertClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid
        item
        container
        xs={12}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h3">{ADMIN_USER}</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {isLoading ? (
          <div style={{ minHeight: "50px" }}>
            <Loader open={true} />
          </div>
        ) : (
          <Paper>
            <Typography className={root} variant="h3">
              {UPDATE} {PROFILE}
            </Typography>
            <Divider />
            <form className={root} onSubmit={(e) => handleSubmit(e, id)}>
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
                <Grid item xs={12}>
                  <CustomButton type="submit" disabled={isLoading}>
                    {UPDATE} {PROFILE}
                  </CustomButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PasswordField
                    label="Password"
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
                <Grid item xs={12}>
                  <CustomButton onClick={(e) => handlePasswordUpdate(e, id)} disabled={isLoading}>
                    {UPDATE} {PASSWORD}
                  </CustomButton>
                </Grid>
              </Grid>
            </form>
          </Paper>
        )}
        {responseMessage.status !== "" && (
          <Toast
            open={alertOpen}
            onClose={handleAlertClose}
            type={responseMessage.status}
            message={responseMessage.message}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Settings;
