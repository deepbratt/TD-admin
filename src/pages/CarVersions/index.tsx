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
import useCarVersions from "./useCarVersions";

const CarVersions = () => {
  const {
    result,
    toastMessage,
    toastOpen,
    setToastOpen,
    toastType,
    isLoading,
    setDeleteDialog,
    deleteDialog,
    versionName,
    setVersionName,
    addDialog,
    setAddDialog,
    createVersion,
    cancelCreateVersion,
    deleteVersion,
    setVersionId,
    editVersion
  } = useCarVersions();
  return (
    <SecondaryLayout>
      <Grid container>
        <PageHeader heading={"Car Versions"}>
          <Button endIcon={<Add />} variant="contained" color="secondary" onClick={()=>setAddDialog(true)}>
            Add Version
          </Button>
        </PageHeader>
        <CustomDivider />
        {result.map((version: any, index: number) => (
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
            key={version._id + index}
          >
            <div style={{ display: "flex" }}>
              <Typography variant="body2">{version.name}</Typography>
            </div>
            <div>
              <IconButton onClick={()=>editVersion(version)}>
                <Edit color={"secondary"} />
              </IconButton>
              <IconButton onClick={()=>{
                setDeleteDialog(true)
                setVersionId(version._id)
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
        handleChange={(e) => setVersionName(e.target.value)}
        helperText="This field is required"
        label="Version Name"
        open={addDialog}
        title="Add New Version"
        value={versionName}
        handleConfirmation={createVersion}
        handleRejection={cancelCreateVersion}
      />
      <ConfirmationDialog
          open={deleteDialog}
          title={"Delete Version"}
          message={"Are you sure that you want to delete this Car Version"}
          rejectBtnLabel={"Cancel"}
          confirmBtnLabel={"Yes"}
          handleConfirmation={deleteVersion}
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

export default CarVersions;