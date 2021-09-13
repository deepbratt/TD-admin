import {
  Card,
  CardContent,
  Divider,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { IMostViewedStats } from "../../pages/home";

const MostViewedCardtyles = makeStyles((theme) => ({
  title: {
    padding: "10px",
  },
  contentRoot: {
    padding: "10px 30px 30px 30px",
  },
  listitem: {
    display: "flex",
    justifyContent: "space-between",
    margin: "15px 0",
  },
}));

interface IMostViewedCardProps {
  header: string;
  data: IMostViewedStats[];
}

const MostViewedCard: React.FC<IMostViewedCardProps> = ({ header, data }) => {
  const { contentRoot, title, listitem } = MostViewedCardtyles();
  return (
    <Card>
      <Typography className={title} variant="h3">
        {header}
      </Typography>
      <Divider />
      <CardContent className={contentRoot}>
        <div>
          {data &&
            data.map((value: IMostViewedStats, index) => (
              <div key={`most-viewed-${header}-${index}`}>
                <div className={listitem}>
                  <span>
                    <Typography variant="h4">{value.make}</Typography>
                  </span>
                  <Typography variant="h4">{value.percentage} %</Typography>
                </div>
                <LinearProgress
                  variant="determinate"
                  value={value.percentage}
                />
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MostViewedCard;
