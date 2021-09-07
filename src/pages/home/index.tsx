import { Grid } from "@material-ui/core";
import GroupRounded from "@material-ui/icons/GroupRounded";
import InfoCards from "../../components/InfoCards";
import DashboardTable from "../../sections/DashboardTable";

const Home = () => {
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
      <Grid item xs={12} lg={10}>
        <DashboardTable />
      </Grid>
    </Grid>
  );
};

export default Home;
