import { Button, Grid, TextField } from "@material-ui/core";
interface UserInformationProps {
  formData: any;
  handleChange: (event: any) => void;
  handleReset: () => void
  handleSubmit: ()=>void
}

const PasswordSection = ({ formData, handleChange, handleReset, handleSubmit }: UserInformationProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          name="newPassword"
          onChange={handleChange}
          value={formData.newPassword}
          label={"New Password"}
          type="password"
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
          label={"Confirm Password"}
          type="password"
          required
          fullWidth
        />
      </Grid>
      <Grid item container xs={12} justifyContent="flex-end" alignItems="flex-start">
          <Button variant="contained" color="default" onClick={()=>handleReset()}>Cancel</Button>
          <Button variant="contained" color="secondary" onClick={()=>handleSubmit()} style={{marginLeft:"10px"}}>Update</Button>
      </Grid>
    </Grid>
  );
};

export default PasswordSection;