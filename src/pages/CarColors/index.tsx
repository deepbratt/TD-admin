import { Box, Button, Grid, IconButton, Typography } from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import CustomDivider from "../../components/CustomDivider";
import InputColorDialog from "./InputColorDialog";
import Loader from "../../components/Loader";
import NoResults from "../../components/NoResults";
import Toast from "../../components/Toast";
import SecondaryLayout from "../../layout/SecondaryLayout";
import PageHeader from "../../sections/PageHeader";
import useCarColors from "./useColors";

const CarColors = () => {
  const {
    result,
    toastMessage,
    toastOpen,
    setToastOpen,
    toastType,
    isLoading,
    setDeleteDialog,
    deleteDialog,
    colorName,
    setColorName,
    addDialog,
    setAddDialog,
    createColor,
    cancelCreateColor,
    deleteColor,
    setColorId,
    editColor,
    colorCode,
    setColorCode
  } = useCarColors();
  return (
    <SecondaryLayout>
      <Grid container>
        <PageHeader heading={"Car Colors"}>
          <Button endIcon={<Add />} variant="contained" color="secondary" onClick={()=>setAddDialog(true)}>
            Add Color
          </Button>
        </PageHeader>
        <CustomDivider />
        {result.map((color: any, index: number) => (
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
            key={color._id + index}
          >
            <div style={{ display: "flex", alignItems:"center" }}>
              <Box height="20px" width="20px" borderRadius="5px" border="1px solid black" style={{background:`${color.code}`}}></Box>
              &nbsp;
              <Typography variant="body2">{color.name}</Typography>
            </div>
            <div>
              <IconButton onClick={()=>editColor(color)}>
                <Edit color={"secondary"} />
              </IconButton>
              <IconButton onClick={()=>{
                setDeleteDialog(true)
                setColorId(color._id)
                }}>
                <Delete color="error" />
              </IconButton>
            </div>
            <CustomDivider />
          </Grid>
        ))}
        {result.length < 1 && <NoResults />}
      </Grid>
      <InputColorDialog
        handleChange={(e) => setColorName(e.target.value)}
        helperText="This field is required"
        label="Color Name"
        open={addDialog}
        title="Add New Color"
        value={colorName}
        handleConfirmation={createColor}
        handleRejection={cancelCreateColor}
        colorValue={colorCode}
        handleColorChange={(color)=>setColorCode(color)}
      />
      <ConfirmationDialog
          open={deleteDialog}
          title={"Delete Color"}
          message={"Are you sure that you want to delete this Car Color"}
          rejectBtnLabel={"Cancel"}
          confirmBtnLabel={"Yes"}
          handleConfirmation={deleteColor}
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

export default CarColors;