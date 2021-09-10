import {
  createStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Arrow1 from "../assets/icons/arrow1.png";
import Arrow2 from "../assets/icons/arrow2.png";
import Arrow3 from "../assets/icons/arrow3.png";
import ArrowActive1 from "../assets/icons/arrow_active1.png";
import ArrowActive2 from "../assets/icons/arrow_active2.png";
import ArrowActive3 from "../assets/icons/arrow_active3.png";
interface IStepIcon {
  label?: string;
  index: number;
  activeIndex: number
}

const iconArray=[
  {active:ArrowActive1, inactive:Arrow1},
  {active:ArrowActive2, inactive:Arrow2},
  {active:ArrowActive3, inactive:Arrow3},
]
const CustomStepperIcon= ({ activeIndex, index, label }: IStepIcon) => {
  const classes = useStyles();
  // const {active, completed, label} = props
  return (
    <div style={{ position: "relative", width:"100%" }}>
      <Typography
        className={clsx(classes.label, index === activeIndex && classes.activeText, activeIndex > index && classes.activeText)}
      >
        {label}
      </Typography>
      <img width="100%" src={index <= activeIndex ? iconArray[index].active : iconArray[index].inactive} alt=""/>
    </div>
  );
};

export default CustomStepperIcon;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      position: "absolute",
      top: "50%",
      left: "7%",
      transform: "translate(-1%, -50%)",
      // width:"100%"
    },
    activeText: {
      color: "white",
    },
    completed: {
      fontWeight: "bolder",
    },
    activeImage:{
        backgroundColor:"blue"
    }
  })
);
