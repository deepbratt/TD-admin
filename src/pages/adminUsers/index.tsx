import { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import CustomButton from "../../components/CustomButton";
import UserDialog from "../../sections/UserDialog";

const AdminUsers: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Grid container justifyContent="center">
      <Grid
        item
        container
        xs={10}
        sm={8}
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={9}>
          <Typography variant="h3">Manage Admin Panel Users</Typography>
        </Grid>
        <Grid container item xs={12} sm={3} justifyContent="flex-end">
          <Button color="secondary" onClick={() => setOpen(true)}>
            Ad Users
          </Button>
          <UserDialog open={open} setOpen={setOpen} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminUsers;
