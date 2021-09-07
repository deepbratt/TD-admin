import {
  Card,
  CardContent,
  Divider,
  Grid,
  Icon,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const InfoCardStyles = makeStyles((theme) => ({
  totalStyles: {
    fontSize: "35px",
    lineHeight: "50px",
  },
  contentRoot: {
    paddingBottom: "5px",
  },
  bottomItems: {
    padding: "10px 0",
  },
}));

interface IInfoCardProps {
  header: string;
  icon: any;
  data: {
    total: number;
    thisMonth: number;
    today: number;
  };
}

const InfoCards: React.FC<IInfoCardProps> = ({ header, data, icon }) => {
  const { contentRoot, totalStyles, bottomItems } = InfoCardStyles();
  return (
    <Card>
      <CardContent className={contentRoot}>
        <Typography variant="h2" gutterBottom>
          {header}
        </Typography>
        <Grid container>
          <Grid item container xs={12}>
            <Grid item container xs={6} justifyContent="center">
              <Typography
                className={totalStyles}
                variant="h2"
                color="primary"
                gutterBottom
              >
                {data.total}
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
          <Grid
            item
            container
            xs={6}
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="body1"
              color="secondary"
              gutterBottom
              component="span"
            >
              Today -
            </Typography>
            <Typography
              variant="body1"
              color="primary"
              gutterBottom
              component="span"
            >
              {data.today}
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
            <Typography variant="body1" color="primary" gutterBottom>
              {data.thisMonth}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default InfoCards;
