import { Button, Grid, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import { useHistory } from "react-router";
import CarCard from "../../components/CarCard";
import CustomDivider from "../../components/CustomDivider";
import HeaderSearch from "../../components/HeaderSearch";
import Loader from "../../components/Loader";
import NoResults from "../../components/NoResults";
import Toast from "../../components/Toast";
import SecondaryLayout from "../../layout/SecondaryLayout";
import PageHeader from "../../sections/PageHeader";
import { ADVERTISEMENTS } from "../../utils/constants/language/en/text";
import useAdvertisements from "./useAdvertisements";

interface AdvertisementsProps {
  createdBy?: string;
}
const Advertisements: React.FC<AdvertisementsProps> = (props) => {
  const {
    // data,
    result,
    // page,
    // setPage,
    isLoading,
    toastMessage,
    toastOpen,
    toastType,
    setToastOpen,
    pageCount,
    getCars,
    // keywords,
    setKeywords,
  } = useAdvertisements(props.createdBy);
  const history = useHistory();
  return (
    <SecondaryLayout>
      <Grid container>
        <PageHeader heading={ADVERTISEMENTS}>
          <div>
          <HeaderSearch
            setKeywords={setKeywords}
            getResults={() => getCars(1)}
          />
          {props.createdBy && <Button
            endIcon={<Add />}
            variant="contained"
            color="secondary"
            onClick={() => history.push("/add/car/" + props.createdBy)}
            style={{padding:"2px 10px", marginLeft:"5px"}}
          >
            ADD CAR
          </Button>}
          </div>
        </PageHeader>
        <CustomDivider />
        {result.map((item: any, index: number) => (
          <Grid
            item
            xs={12}
            style={{ display: "flex" }}
            justifyContent="center"
            key={"car-card-ad-" + index}
          >
            <CarCard data={item} layoutType="list" />
          </Grid>
        ))}
        {result.length < 1 && (
          <NoResults/>
        )}
        <Grid
          item
          xs={12}
          style={{ display: "flex", marginTop: 5 }}
          justifyContent="flex-end"
        >
          <Pagination
            count={pageCount}
            onChange={(event, value) => getCars(value)}
            color="secondary"
          />
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

export default Advertisements;

Advertisements.defaultProps = {
  createdBy: "",
};
