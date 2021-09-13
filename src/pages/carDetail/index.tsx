import { Button, Grid, Typography } from "@material-ui/core";
import CustomDivider from "../../components/CustomDivider";
import SecondaryLayout from "../../layout/SecondaryLayout";
import tyreIcon from "../../assets/icons/tyre 2.png";
import {
  EDIT as EditBtnLabel,
} from "../../utils/constants/language/en/buttonLabels";
import {
  Edit,
  LocationOnOutlined,
} from "@material-ui/icons";
import CarSlider from "../../sections/CarSlider";
import useCarDetails from "./useCarDetails";
import { useHistory } from "react-router";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import {
  CAR_DETAILS,
  DESCRIPTION,
  FEATURES,
  SELLER_INFO,
} from "../../utils/constants/language/en/text";
import PageHeader from "../../sections/PageHeader";
import KeyValueMap from "../../sections/CarDetailSection/keyValueMap";
import CarSpecs from "../../sections/CarDetailSection/CarSpecs";
import ActionButtons from "../../sections/CarDetailSection/ActionButtons";

const CarDetail = () => {
  const {
    isActive,
    result,
    isBanned,
    isLoading,
    toastMessage,
    toastOpen,
    toastType,
    setToastOpen,
    deleteAd,
    toggleActive,
    toggleBan,
    toggleSold,
    id,
    detail,
    seller,
    specs,
    deleteDialog,
    setDeleteDialog,
    sellDialog,
    setSellDialog,
    isSold
  } = useCarDetails();
  const history = useHistory();
  return (
    <SecondaryLayout>
      <Grid container spacing={2}>
        <PageHeader heading={CAR_DETAILS}>
          <Button
            startIcon={<Edit />}
            variant="contained"
            onClick={() => history.push("/add-edit/car/" + id)}
            color="primary"
          >
            {EditBtnLabel}
          </Button>
        </PageHeader>
        <CustomDivider />
        <Grid item xs={12} sm={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CarSlider dataArray={result.image} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">{DESCRIPTION}</Typography>
              <Typography variant="body2" style={{ marginTop: 5 }}>
                {result.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <KeyValueMap keyValueArray={detail} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">{FEATURES}</Typography>
              <Grid container spacing={1} style={{ marginTop: 5 }}>
                {result.features.map((feature: string, index: any) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    key={"car-features-" + index}
                  >
                    <img src={tyreIcon} alt="" width="15px" />
                    <Typography variant="body2" style={{ marginLeft: 5 }}>
                      {feature}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h2">
                {`${result.make} ${result.model} ${result.modelYear}`}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ display: "flex", alignItems: "center" }}
              >
                <LocationOnOutlined />
                {result.city}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="primary" variant="h3">
                PKR {result.price}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              {specs.map(
                (item: { icon: string; value: string }, index: number) => (
                  <CarSpecs icon={item.icon} value={item.value} key={"car-specs-"+index} />
                )
              )}
            </Grid>
            <Grid item xs={12}>
              <ActionButtons
                result={result}
                isActive={isActive}
                isBanned={isBanned}
                deleteAd={deleteAd}
                toggleActive={toggleActive}
                toggleBan={toggleBan}
                deleteDialog={deleteDialog}
                setDeleteDialog={setDeleteDialog}
                isSold={isSold}
                sellDialog={sellDialog}
                setSellDialog={setSellDialog}
                toggleSold={toggleSold}
              />
            </Grid>
            <Grid item xs={12}>
              <KeyValueMap heading={SELLER_INFO} keyValueArray={seller} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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

export default CarDetail;
