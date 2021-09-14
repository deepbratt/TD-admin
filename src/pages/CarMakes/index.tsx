import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import { useHistory } from "react-router";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import CustomDivider from "../../components/CustomDivider";
import InputDialog from "../../components/InputDialog";
import Loader from "../../components/Loader";
import NoResults from "../../components/NoResults";
import Toast from "../../components/Toast";
import SecondaryLayout from "../../layout/SecondaryLayout";
import PageHeader from "../../sections/PageHeader";
import useCarMakes from "./useCarMakes";

const CarMakes = () => {
  const {
    result,
    toastMessage,
    toastOpen,
    setToastOpen,
    toastType,
    isLoading,
    setDeleteDialog,
    deleteDialog,
    makeName,
    setMakeName,
    addDialog,
    setAddDialog,
    createMake,
    cancelCreateMake,
    deleteMake,
    setMakeId,
  } = useCarMakes();
  const history = useHistory()
  return (
    <SecondaryLayout>
      <Grid container>
        <PageHeader heading={"Car Makes"}>
          <Button endIcon={<Add />} variant="contained" color="secondary" onClick={()=>setAddDialog(true)}>
            Add Make
          </Button>
        </PageHeader>
        <CustomDivider />
        {result.map((make: any, index: number) => (
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
            key={make._id + index}
          >
            <div style={{ display: "flex" }}>
              <Typography variant="body2">{make.name}</Typography>
            </div>
            <div>
              <IconButton onClick={()=>history.push('/car-make/'+make._id)}>
                <Edit color={"secondary"} />
              </IconButton>
              <IconButton onClick={()=>{
                setDeleteDialog(true)
                setMakeId(make._id)
                }}>
                <Delete color="error" />
              </IconButton>
            </div>
            <CustomDivider />
          </Grid>
        ))}
        {result.length < 1 && <NoResults />}
      </Grid>
      <InputDialog
        handleChange={(e) => setMakeName(e.target.value)}
        helperText="This field is required"
        label="Make Name"
        open={addDialog}
        title="Add New Make"
        value={makeName}
        handleConfirmation={createMake}
        handleRejection={cancelCreateMake}
      />
      <ConfirmationDialog
          open={deleteDialog}
          title={"Delete Make"}
          message={"Are you sure that you want to delete this Car Make"}
          rejectBtnLabel={"Cancel"}
          confirmBtnLabel={"Yes"}
          handleConfirmation={deleteMake}
          handleRejection={() => {setDeleteDialog(false)}}
        />
      <Loader open={isLoading} isBackdrop={true} />
      <Toast
        onClose={() => setToastOpen(false)}
        open={toastOpen}
        message={toastMessage}
        type={toastType}
      />
    </SecondaryLayout>
  );
};

export default CarMakes;
