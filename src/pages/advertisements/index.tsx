import {
  Grid,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import CarCard from "../../components/CarCard";
import CustomDivider from "../../components/CustomDivider";
import HeaderSearch from "../../components/HeaderSearch";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import SecondaryLayout from "../../layout/SecondaryLayout";
import PageHeader from "../../sections/PageHeader";
import { ADVERTISEMENTS } from "../../utils/constants/language/en/text";
import useAdvertisements from "./useAdvertisements";


const Advertisements = () => {
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
    setKeywords
  } = useAdvertisements();
  return (
    <SecondaryLayout>
      <Grid container style={{minHeight:"90vh"}}>
        <PageHeader heading={ADVERTISEMENTS}>
          <HeaderSearch setKeywords={setKeywords} getResults={()=>getCars(1)}/>
        </PageHeader>
        <CustomDivider/>
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
        <Grid
          item
          xs={12}
          style={{ display: "flex" , marginTop:5}}
          justifyContent="flex-end"
        >
          <Pagination count={pageCount} onChange={(event, value)=>getCars(value)} color="secondary"/>
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
