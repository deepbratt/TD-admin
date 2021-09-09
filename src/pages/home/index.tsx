import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import InfoCards from "../../components/InfoCards";
import DashboardTable from "../../sections/DashboardTable";
import { getAllData } from "../../utils/API/API";
import { API_ENDPOINTS } from "../../utils/API/endpoints";
import GroupRounded from "@material-ui/icons/GroupRounded";
import DriveEtaRoundedIcon from "@material-ui/icons/DriveEtaRounded";

interface IStats {
  today: number;
  monthly: number;
  total: number;
}

const Home = () => {
  const { ADS, CARS, OWNERS_STATS, CARS_STATS } = API_ENDPOINTS;
  const [carOwnersStats, setCarOwnersStats] = useState<IStats>({
    today: 0,
    monthly: 0,
    total: 0,
  });
  const [carListingStats, setCarListingStats] = useState<IStats>({
    today: 0,
    monthly: 0,
    total: 0,
  });

  const getOwnersStats = async () => {
    await getAllData(ADS + CARS + OWNERS_STATS)
      .then((response) => {
        if (response.status === "success") {
          setCarOwnersStats(response.data.result);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const getCarsListingStats = async () => {
    await getAllData(ADS + CARS + CARS_STATS)
      .then((response) => {
        if (response.status === "success") {
          setCarListingStats(response.data.result);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    getOwnersStats();
    getCarsListingStats();
  }, []);

  let carsInfoCardProps = {
    header: "Total Cars",
    icon: <DriveEtaRoundedIcon style={{ fontSize: "50px" }} />,
    data: carListingStats,
  };

  let ownersInfoCardProps = {
    header: "Total Owner",
    icon: <GroupRounded style={{ fontSize: "50px" }} />,
    data: carOwnersStats,
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item container spacing={3} xs={12} lg={8}>
        <Grid item xs={12} sm={6}>
          <InfoCards {...carsInfoCardProps} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InfoCards {...ownersInfoCardProps} />
        </Grid>
      </Grid>
      <Grid item xs={12} lg={8}>
        <DashboardTable />
      </Grid>
    </Grid>
  );
};

export default Home;
