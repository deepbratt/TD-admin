import { useForm } from "./useForm";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import Toast from "../../components/Toast";
import {
  Grid,
  LinearProgress,
  Typography,
  Card,
  Button,
} from "@material-ui/core";
import InputField from "../../components/InputField";
import { routes, paths } from "../../routes/paths";
import PasswordField from "../../components/InputField/PasswordField";
import { fieldNames } from "../../utils/constants/formsConstants";
import {
  SIGNIN,
  SIGNIN_USING_ACCOUNT,
  FORGOT_PASS,
} from "../../utils/constants/language/en/buttonLabels";
import GlobalStyles from "../../globalStyles";

const Login = () => {
  const history = useHistory();
  const { loginFormGrid, formCard, formStyle, loginbtn } = GlobalStyles();
  const {
    values,
    errors,
    isLoading,
    alertOpen,
    handleSubmit,
    setAlertOpen,
    responseMessage,
    handleInputChange,
  } = useForm();

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
    <Grid
      className={loginFormGrid}
      container
      justifyContent="center"
      alignContent="center"
    >
      <Grid item xs={10} md={8} lg={4}>
        {isLoading && <LinearProgress color="secondary" />}

        <Card className={formCard}>
          <Typography variant="h6" gutterBottom>
            {SIGNIN}
          </Typography>

          <form className={formStyle} onSubmit={handleSubmit}>
            <Typography variant="body2" gutterBottom>
              {SIGNIN_USING_ACCOUNT}
            </Typography>

            <InputField
              id="input-data"
              name={fieldNames.data}
              fullWidth
              variant="outlined"
              label="Email/Phone Number"
              value={values.data}
              error={errors.data}
              onChange={handleInputChange}
            />

            <PasswordField
              id="input-password"
              name={fieldNames.password}
              fullWidth
              variant="outlined"
              label="Password"
              value={values.password}
              error={errors.password}
              onChange={handleInputChange}
            />

            <NavLink to={paths.forgotPassword}>
              <Typography variant="button" gutterBottom>
                {FORGOT_PASS}
              </Typography>
            </NavLink>

            <Button
              className={loginbtn}
              fullWidth
              disabled={isLoading}
              variant="contained"
              color="secondary"
              type="submit"
            >
              {SIGNIN}
            </Button>

            {responseMessage.status === "success" && history.push(routes.home)}
          </form>
        </Card>
      </Grid>

      {responseMessage && (
        <Toast
          open={alertOpen}
          onClose={handleAlertClose}
          type={responseMessage.status}
          message={responseMessage.message}
        />
      )}
    </Grid>
  );
};

export default Login;
