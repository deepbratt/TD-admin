import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import {
  AddCircleOutline,
  Block,
  Delete,
  LocationOn,
  PlaylistAddCheck,
  RemoveCircleOutline,
} from "@material-ui/icons";
import CardStyles from "./styles";
import NoImg from "../../assets/icons/no-img.png";
import { Colors } from "../../theme/themeConstants";
import moment from "moment";
import Toast from "../Toast";
import Loader from "../Loader";
import useCarCard from "./useCarCard";
import { useHistory } from "react-router";
import {
  ACTIVE,
  BAN,
  DELETE,
  INACTIVE,
  SOLD,
  UNBAN,
  UNSOLD,
} from "../../utils/constants/language/en/buttonLabels";
import ConfirmationDialog from "../ConfirmationDialog";
import addEditCarData from "../../utils/constants/language/en/addEditCarData";

interface CarCardProps {
  data: any;
  layoutType: "list" | "grid";
  reload: boolean;
  setReload: (bool: boolean) => void;
}

const CarCard = ({
  data,
  layoutType = "list",
  reload,
  setReload,
}: CarCardProps) => {
  const { root, grid, featuredBadge, location } = CardStyles();
  const {
    isActive,
    toggleActive,
    toggleBan,
    deleteAd,
    isBanned,
    toastOpen,
    setToastOpen,
    toastType,
    toastMessage,
    isLoading,
    deleteDialog,
    setDeleteDialog,
  } = useCarCard(data, reload, setReload);
  const history = useHistory();
  return (
    <Card
      style={{ cursor: "pointer" }}
      className={layoutType === "list" ? root : grid}
      onClick={() => history.push("/car/" + data._id)}
    >
      <Grid container style={{ border: "5px solid" + Colors.background }}>
        <Grid item xs={12} sm={layoutType !== "list" ? 12 : 3}>
          <CardMedia
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              maxHeight: "175px",
              minHeight: "100%",
            }}
          >
            <img
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                minWidth: "100%",
                minHeight: "175px",
              }}
              src={data.image.length !== 0 ? data.image[0] : NoImg}
              alt=""
            />
          </CardMedia>
        </Grid>
        <Grid item container xs={12} sm={layoutType !== "list" ? 12 : 7}>
          <CardContent style={{ margin: "0" }}>
            <Grid
              item
              container
              spacing={2}
              direction="column"
              justifyContent="space-between"
            >
              {data.isSold ? (
                <span className={featuredBadge}>
                  <Typography variant="body2">{SOLD}</Typography>
                </span>
              ) : null}
              <Grid item container justifyContent="space-between" xs={12}>
                <Grid item>
                  <Typography variant="h5">
                    {moment(data.createdAt).format("DD MMMM YYYY")}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="secondary" variant="h4">
                    {data.price && `PKR ${data.price?.toLocaleString()}`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12} spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h3" style={{ cursor: "pointer" }}>
                    {`${data.make} ${data.model}`}
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  spacing={1}
                  justifyContent="flex-start"
                >
                  <Grid item>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                      component="span"
                    >
                      {data.modelYear}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                      component="span"
                    >
                      {data.mileage?.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                      component="span"
                    >
                      {data.engineType}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                      component="span"
                    >
                      {`${data.engineCapacity} cc`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                      component="span"
                    >
                      {data.transmission}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                      component="span"
                    >
                      {data.isSold ? SOLD : UNSOLD}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                      component="span"
                    >
                      {isActive ? ACTIVE : INACTIVE}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <div className={location}>
                    <span>
                      <LocationOn />
                      <Typography variant="subtitle2">{data.city}</Typography>
                    </span>
                    <span>
                      <Typography variant="subtitle2">
                        <span>{moment(data.updatedAt).format("DD MMMM")}</span>
                      </Typography>
                    </span>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
        <Grid
          item
          xs={1}
          sm={layoutType !== "list" ? 12 : 2}
          style={{ display: "flex", padding: "5px" }}
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Button
            endIcon={
              !isActive ? (
                <AddCircleOutline color="primary" />
              ) : (
                <RemoveCircleOutline color="error" />
              )
            }
            onClick={(e) => toggleActive(e)}
            color="secondary"
            variant="contained"
            fullWidth
          >
            {!isActive ? ACTIVE : INACTIVE}
          </Button>

          <Button
            endIcon={
              isBanned ? (
                <PlaylistAddCheck color="primary" />
              ) : (
                <Block color="error" />
              )
            }
            onClick={(e) => toggleBan(e)}
            color="secondary"
            variant="contained"
            fullWidth
          >
            {isBanned ? UNBAN : BAN}
          </Button>

          <Button
            endIcon={<Delete color="error" />}
            onClick={(e) => {
              e.stopPropagation();
              setDeleteDialog(true);
            }}
            title="Delete"
            color="secondary"
            variant="contained"
            fullWidth
          >
            {DELETE}
          </Button>
        </Grid>
      </Grid>
      <Toast
        message={toastMessage}
        type={toastType}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
      />
      <ConfirmationDialog
        open={deleteDialog}
        title={addEditCarData.deleteDialogTitle}
        message={addEditCarData.deleteDialogMessage}
        rejectBtnLabel={addEditCarData.buttons.cancelDelete}
        confirmBtnLabel={addEditCarData.buttons.confirmDelete}
        handleConfirmation={deleteAd}
        handleRejection={() => {
          setDeleteDialog(false);
        }}
      />
      <Loader open={isLoading} isBackdrop={true} />
    </Card>
  );
};

export default CarCard;
