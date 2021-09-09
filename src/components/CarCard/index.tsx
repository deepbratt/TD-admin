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
import { useState } from "react";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import { deleteData, updateData } from "../../utils/API/APIs";
import Toast from "../Toast";
import Loader from "../Loader";

interface CarCardProps {
  data: any;
  layoutType: "list" | "grid";
}

const CarCard = ({ data, layoutType = "list" }: CarCardProps) => {
  const { root, grid, featuredBadge, location } = CardStyles();
  const [isBanned, setIsBanned] = useState(data.banned);
  const [isActive, setIsActive] = useState(data.active);
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const toggleBan = () => {
    let banUnban = isBanned ? API_ENDPOINTS.MARK_UNBAN : API_ENDPOINTS.MARK_BAN;
    setIsLoading(true);
    updateData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${banUnban}/${data._id}`
    ).then((response: any) => {
      if (response && response.data && response.data.status === "success") {
        setIsBanned(!isBanned);
        setToastMessage(response.data.message);
        setToastType("success");
      } else {
        console.log(response);
        setToastMessage(response.message);
        setToastType("error");
      }
      setToastOpen(true);
      setIsLoading(false);
    });
  };

  const toggleActive = () => {
    let activeInactive = isActive
      ? API_ENDPOINTS.MARK_INACTIVE
      : API_ENDPOINTS.MARK_ACTIVE;
    setIsLoading(true);
    updateData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}${activeInactive}/${data._id}`
    ).then((response: any) => {
      if (response && response.data && response.data.status === "success") {
        setIsActive(!isActive);
        setToastMessage(response.data.message);
        setToastType("success");
      } else {
        console.log(response);
        setToastMessage(response.message);
        setToastType("error");
      }
      setToastOpen(true);
      setIsLoading(false);
    });
  };

  const deleteAd = () => {
    setIsLoading(true)
    deleteData(
      `${API_ENDPOINTS.ADS}${API_ENDPOINTS.CARS}/${data._id}`
    ).then((response: any) => {
      if (response && response.data && response.data.status === "success") {
        setToastMessage(response.data.message);
        setToastType("success");
      } else {
        console.log(response);
        setToastMessage(response.message);
        setToastType("error");
      }
      setToastOpen(true);
      setIsLoading(false);
    });
  };
  return (
    <Card
      style={{ cursor: "pointer" }}
      className={layoutType === "list" ? root : grid}
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
                  <Typography variant="body2">{"SOLD"}</Typography>
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
                      {data.isSold ? "SOLD" : "UNSOLD"}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                      component="span"
                    >
                      {isActive ? "ACTIVE" : "INACTIVE"}
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
            onClick={()=>toggleActive()}
            color="secondary"
            variant="contained"
            fullWidth
          >
            {!isActive ? "Active" : "Inactive"}
          </Button>

          <Button
            endIcon={
              isBanned ? (
                <PlaylistAddCheck color="primary" />
              ) : (
                <Block color="error" />
              )
            }
            onClick={()=>toggleBan()}
            color="secondary"
            variant="contained"
            fullWidth
          >
            {isBanned ? "Unban" : "Ban"}
          </Button>

          <Button
            endIcon={<Delete color="error" />}
            onClick={()=>deleteAd()}
            title="Delete"
            color="secondary"
            variant="contained"
            fullWidth
          >
            Delete
          </Button>
        </Grid>
      </Grid>
      <Toast
        message={toastMessage}
        type={toastType}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
      />
      <Loader open={isLoading} isBackdrop={true} />
    </Card>
  );
};

export default CarCard;
