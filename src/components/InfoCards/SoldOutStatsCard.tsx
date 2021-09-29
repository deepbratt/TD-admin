import {
  Card,
  CardContent,
  Divider,
  Grid,
  Icon,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const SoldOutStatsCardtyles = makeStyles((theme) => ({
  totalStyles: {
    fontSize: "35px",
    lineHeight: "50px",
  },
  contentRoot: {
    padding: "30px 30px 10px 30px",
  },
  bottomItems: {
    padding: "10px 0",
    marginLeft: "30px",
  },
  valuesMargin: {
    marginLeft: "5px",
  },
}));

export interface IData {
  total: {
    totalCars: number;
    totalSold: number;
    percentage: number;
  };
  monthly: {
    totalCars: number;
    totalSoldThisMonth: number;
    percentage: number;
  };
}

interface ISoldOutStatsCardProps {
  header: string;
  icon: any;
  data: IData;
}

const SoldOutStatsCard: React.FC<ISoldOutStatsCardProps> = ({
  header,
  data,
  icon,
}) => {
  const { contentRoot, totalStyles, bottomItems, valuesMargin } =
    SoldOutStatsCardtyles();
  return (
    <Card>
      <CardContent className={contentRoot}>
        <Typography variant="h3" gutterBottom>
          {header}
        </Typography>
        <Grid container>
          <Grid item container xs={12}>
            <Grid item container xs={6}>
              <Typography
                className={totalStyles}
                variant="h2"
                color="primary"
                gutterBottom
              >
                {data.total.totalSold}
              </Typography>
              <Typography variant="caption" color="primary" gutterBottom>
                {data.total.percentage} %
              </Typography>
            </Grid>
            <Grid item container xs={6} justifyContent="center">
              <Icon
                style={{ fontSize: "50px" }}
                color="primary"
                fontSize="large"
              >
                {icon}
              </Icon>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Divider variant="fullWidth" />
      <Grid container>
        <Grid className={bottomItems} item container xs={12}>
          <Grid item container xs={12} alignItems="center">
            <Grid
              item
              container
              xs={6}
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="body1" color="secondary" gutterBottom>
                This Month -
              </Typography>
              <Typography
                className={valuesMargin}
                variant="body1"
                color="primary"
                gutterBottom
              >
                {data.monthly.percentage} %
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={6}
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="body1" color="secondary" gutterBottom>
                This Month -
              </Typography>
              <Typography
                className={valuesMargin}
                variant="body1"
                color="primary"
                gutterBottom
              >
                {data.monthly.totalSoldThisMonth}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SoldOutStatsCard;
