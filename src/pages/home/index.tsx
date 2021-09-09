import { Grid } from "@material-ui/core";
import GroupRounded from "@material-ui/icons/GroupRounded";
import { useEffect, useState } from "react";
import InfoCards from "../../components/InfoCards";
import DashboardTable from "../../sections/DashboardTable";
import { getAllData } from "../../utils/API/API";
import { API_ENDPOINTS } from "../../utils/API/endpoints";

interface IStats {
  today: number;
  thismonth: number;
  total: number;
}

const Home = () => {
  const { CARS, OWNERS_TODAY, OWNERS_TOTAL, OWNERS_MONTHLY } = API_ENDPOINTS;
  const [carOwnersStats, setCarOwnersStats] = useState<number>(0);
  const [carListingStats, setCarListingStats] = useState<IStats | null>(null);

  const getStats = async (ENDPOINT: string) => {
    await getAllData(CARS + ENDPOINT)
      .then((response) => {
        console.log("response", response);
        setCarOwnersStats(response.count);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    getStats(OWNERS_TOTAL);
  }, []);

  let infoCardProps = {
    header: "Total Owner",
    icon: <GroupRounded style={{ fontSize: "50px" }} />,
    data: {
      today: 78,
      thisMonth: 200,
      total: 500,
    },
  };
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item container spacing={3} xs={12} lg={8}>
        <Grid item xs={12} sm={6}>
          <InfoCards {...infoCardProps} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InfoCards {...infoCardProps} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InfoCards {...infoCardProps} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InfoCards {...infoCardProps} />
        </Grid>
      </Grid>
      <Grid item xs={12} lg={8}>
        <DashboardTable />
      </Grid>
    </Grid>
  );
};

export default Home;
