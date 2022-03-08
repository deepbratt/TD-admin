import { useHistory } from "react-router";
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from "@material-ui/core";
import Dropdown from '../../components/Dropdown';
import { Add } from "@material-ui/icons";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { Pagination } from "@material-ui/lab";
import CarCard from "../../components/CarCard";
import CustomDivider from "../../components/CustomDivider";
import HeaderSearch from "../../components/HeaderSearch";
import Loader from "../../components/Loader";
import NoResults from "../../components/NoResults";
import Toast from "../../components/Toast";
import SecondaryLayout from "../../layout/SecondaryLayout";
import { paths } from "../../routes/paths";
import PageHeader from "../../sections/PageHeader";
import { fieldNames } from "../../utils/constants/formsConstants";
import { BULK_UPLOAD_ADS } from "../../utils/constants/language/en/buttonLabels";
import { ADVERTISEMENTS } from "../../utils/constants/language/en/text";
import {
  sortingOptions,
  
} from '../../utils/constants/language/en/filtersData';
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
    reload,
    setReload,
    isLoading,
    toastMessage,
    toastOpen,
    toastType,
    setToastOpen,
    pageCount,
    getCars,
    // keywords,
    setKeywords,
    totalCount,
    handleInputChange,
  } = useAdvertisements(props.createdBy);
  const history = useHistory();

  const carFilters = useSelector(
    (state: RootState) => state.carFilters.filters
  );

  return (
    <SecondaryLayout>
      <Grid container>
        <PageHeader heading={ADVERTISEMENTS + ` (${totalCount})`}>
          <Grid item xs={12} container justifyContent="flex-end" spacing={1}>
            <Grid item xs={6}>
              <Dropdown
                label="SORT"
                name={fieldNames.sortingOptions}
                onChange={handleInputChange}
                value={carFilters.sort}
                options={sortingOptions}
              />
            </Grid>
            <Grid item xs={6}>
              <HeaderSearch
                setKeywords={setKeywords}
                getResults={() => getCars(1)}
              />
            </Grid>
            {props.createdBy && (
              <Grid>
                <Button
                  endIcon={<Add />}
                  variant="contained"
                  color="secondary"
                  onClick={() => history.push(paths.addCar + props.createdBy)}
                  style={{ padding: "2px 10px", marginLeft: "5px" }}
                >
                  ADD CAR
                </Button>
                <Button
                  endIcon={<FileCopyIcon />}
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    history.push(paths.bulkUpload + props.createdBy)
                  }
                  style={{ padding: "2px 10px", marginLeft: "5px" }}
                >
                  {BULK_UPLOAD_ADS}
                </Button>
              </Grid>
            )}
          </Grid>
        </PageHeader>
        <CustomDivider />
        {result.map((item: any, index: number) => (
          <Grid
            item
            container
            xs={12}
            style={{ display: "flex" }}
            justifyContent="center"
            key={"car-card-ad-" + index}
          >
            <CarCard
              data={item}
              layoutType="list"
              reload={reload}
              setReload={setReload}
            />
          </Grid>
        ))}
        {result.length < 1 && !isLoading && <NoResults />}
        {result.length > 0 && (
          <Grid
            item
            container
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
        )}
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
