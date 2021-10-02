import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import CustomDivider from "../../components/CustomDivider";
import InputDialog from "../../components/InputDialog";
import Loader from "../../components/Loader";
import NoResults from "../../components/NoResults";
import Toast from "../../components/Toast";
import SecondaryLayout from "../../layout/SecondaryLayout";
import PageHeader from "../../sections/PageHeader";
import useCarFeatures from "./useCarFeatures";
import NoImg from "../../assets/icons/no-img.png";

const CarFeaturess = () => {
  const {
    result,
    toastMessage,
    toastOpen,
    setToastOpen,
    toastType,
    isLoading,
    setDeleteDialog,
    deleteDialog,
    addDialog,
    setAddDialog,
    createFeatures,
    cancelCreateFeatures,
    deleteFeatures,
    editFeatures,
    setFeaturesValues,
    featuresValues,
    handleChange,
  } = useCarFeatures();
  return (
    <SecondaryLayout>
      <Grid container>
        <PageHeader heading="Car Features">
          <Button
            endIcon={<Add />}
            variant="contained"
            color="secondary"
            onClick={() => setAddDialog(true)}
          >
            Add Feature
          </Button>
        </PageHeader>
        <CustomDivider />
        {result.map((features: any, index: number) => (
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
            key={features._id + index}
          >
            <div style={{ display: "flex", alignItems:"Center" }}>
              <img src={features.image || NoImg} width="50px" alt="" />
              &nbsp;
              <Typography variant="body2">{features.name}</Typography>
            </div>
            <div>
              <IconButton onClick={() => editFeatures(features)}>
                <Edit color={"secondary"} />
              </IconButton>
              <IconButton
                onClick={() => {
                  setDeleteDialog(true);
                  setFeaturesValues({name:"_id",value: features._id});
                }}
              >
                <Delete color="error" />
              </IconButton>
            </div>
            <CustomDivider />
          </Grid>
        ))}
        {result.length < 1 && <NoResults />}
      </Grid>
      <InputDialog
        handleChange={handleChange}
        helperText="This field is required"
        label="Features Name"
        open={addDialog}
        title="Add New Features"
        value={featuresValues.name}
        imageValue={featuresValues.image}
        withImage={true}
        handleConfirmation={createFeatures}
        handleRejection={cancelCreateFeatures}
      />
      <ConfirmationDialog
        open={deleteDialog}
        title={"Delete Features"}
        message={"Are you sure that you want to delete this Car Features"}
        rejectBtnLabel={"Cancel"}
        confirmBtnLabel={"Yes"}
        handleConfirmation={deleteFeatures}
        handleRejection={() => {
          setDeleteDialog(false);
        }}
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

export default CarFeaturess;
