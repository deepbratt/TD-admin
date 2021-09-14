import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import { Add, Delete, Edit, OpenInNew } from "@material-ui/icons";
import { useHistory } from "react-router";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import CustomDivider from "../../components/CustomDivider";
import InputDialog from "../../components/InputDialog";
import Loader from "../../components/Loader";
import NoResults from "../../components/NoResults";
import Toast from "../../components/Toast";
import SecondaryLayout from "../../layout/SecondaryLayout";
import PageHeader from "../../sections/PageHeader";
import useCarModels from "./useCarModels";

const CarModels = () => {
  const {
    result,
    toastMessage,
    toastOpen,
    setToastOpen,
    toastType,
    isLoading,
    setDeleteDialog,
    deleteDialog,
    modelName,
    setModelName,
    addDialog,
    setAddDialog,
    createModel,
    cancelCreateModel,
    deleteModel,
    setModelId,
    editModel
  } = useCarModels();
  const history = useHistory()
  return (
    <SecondaryLayout>
      <Grid container>
        <PageHeader heading={"Car Models"}>
          <Button endIcon={<Add />} variant="contained" color="secondary" onClick={()=>setAddDialog(true)}>
            Add Model
          </Button>
        </PageHeader>
        <CustomDivider />
        {result.map((model: any, index: number) => (
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
            key={model._id + index}
          >
            <div style={{ display: "flex" }}>
              <Typography variant="body2">{model.name}</Typography>
            </div>
            <div>
            <IconButton onClick={()=>history.push('/car-versions/'+model.model_id)} title="View Versions">
                <OpenInNew color={"primary"} />
              </IconButton>
              <IconButton onClick={()=>editModel(model)}>
                <Edit color={"secondary"} />
              </IconButton>
              <IconButton onClick={()=>{
                setDeleteDialog(true)
                setModelId(model._id)
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
        handleChange={(e) => setModelName(e.target.value)}
        helperText="This field is required"
        label="Model Name"
        open={addDialog}
        title="Add New Model"
        value={modelName}
        handleConfirmation={createModel}
        handleRejection={cancelCreateModel}
      />
      <ConfirmationDialog
          open={deleteDialog}
          title={"Delete Model"}
          message={"Are you sure that you want to delete this Car Model"}
          rejectBtnLabel={"Cancel"}
          confirmBtnLabel={"Yes"}
          handleConfirmation={deleteModel}
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

export default CarModels;