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
import useCarBodyTypes from "./useCarBodyTypes";
import NoImg from "../../assets/icons/no-img.png";

const CarBodyTypes = () => {
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
    createBodyType,
    cancelCreateBodyType,
    deleteBodyType,
    editBodyType,
    setBodyTypeValues,
    bodyTypeValues,
    handleChange,
  } = useCarBodyTypes();
  return (
    <SecondaryLayout>
      <Grid container>
        <PageHeader heading="Car Body Types">
          <Button
            endIcon={<Add />}
            variant="contained"
            color="secondary"
            onClick={() => setAddDialog(true)}
          >
            Add Body Type
          </Button>
        </PageHeader>
        <CustomDivider />
        {result.map((bodyType: any, index: number) => (
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
            key={bodyType._id + index}
          >
            <div style={{ display: "flex", alignItems:"Center" }}>
              <img src={bodyType.image || NoImg} width="50px" alt="" />
              &nbsp;
              <Typography variant="body2">{bodyType.bodyType}</Typography>
            </div>
            <div>
              <IconButton onClick={() => editBodyType(bodyType)}>
                <Edit color={"secondary"} />
              </IconButton>
              <IconButton
                onClick={() => {
                  setDeleteDialog(true);
                  setBodyTypeValues({name:"_id",value: bodyType._id});
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
        label="BodyType Name"
        open={addDialog}
        title="Add New BodyType"
        value={bodyTypeValues.name}
        imageValue={bodyTypeValues.image}
        withImage={true}
        handleConfirmation={createBodyType}
        handleRejection={cancelCreateBodyType}
      />
      <ConfirmationDialog
        open={deleteDialog}
        title={"Delete BodyType"}
        message={"Are you sure that you want to delete this Car BodyType"}
        rejectBtnLabel={"Cancel"}
        confirmBtnLabel={"Yes"}
        handleConfirmation={deleteBodyType}
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

export default CarBodyTypes;
