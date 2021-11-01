import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import moment from "moment";
interface UserInformationProps {
  formData: any;
  handleChange: (event: any) => void;
  handlePhoneInputChange: (event: any) => void;
  handleReset: () => void;
  handleSubmit: () => void;
}

const UserInformation = ({
  formData,
  handleChange,
  handlePhoneInputChange,
  handleReset,
  handleSubmit,
}: UserInformationProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          name="firstName"
          onChange={handleChange}
          value={formData.firstName}
          label={"First Name"}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="lastName"
          onChange={handleChange}
          value={formData.lastName}
          label={"Last Name"}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="email"
          onChange={handleChange}
          value={formData.email}
          label={"Email"}
          fullWidth
          disabled={formData.signedUpWithEmail}
          type={"email"}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="phone"
          onChange={handlePhoneInputChange}
          value={formData.phone}
          label={"phone"}
          disabled={formData.signedUpWithPhone}
          fullWidth
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+92</InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="userName"
          onChange={handleChange}
          value={formData.userName}
          label={"User Name"}
          disabled
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="joined"
          onChange={handleChange}
          value={moment(formData.joined).format("DD MMMM YYYY")}
          label={"Joined"}
          disabled
          fullWidth
        />
      </Grid>
      <Grid item xs={12} style={{ display: "flex" }} justifyContent="flex-end">
        <Button
          variant="contained"
          color="default"
          onClick={() => handleReset()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleSubmit()}
          style={{ marginLeft: "10px" }}
        >
          Update
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserInformation;
