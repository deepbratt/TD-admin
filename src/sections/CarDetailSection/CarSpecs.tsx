import { Typography } from "@material-ui/core";

interface CarSpecsProp {
  icon: string;
  value: string;
}

const CarSpecs = ({ icon, value }: CarSpecsProp) => {
  return (
    <div>
      <img src={icon} alt="" />
      <Typography variant="h5" color="primary">
        {value}
      </Typography>
    </div>
  );
};

export default CarSpecs;
