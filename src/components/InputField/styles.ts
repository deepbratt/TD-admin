import { makeStyles } from "@material-ui/core/styles";
const LayoutStyle = makeStyles((theme) => ({
  root: {
    margin: "10px 0",
    backgroundColor: "white",
  },
  input: {
    [theme.breakpoints.down("md")]: {
      fontSize: "16px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
    "&::placeholder": {
      [theme.breakpoints.down("md")]: {
        fontSize: "16px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "14px",
      },
    },
  },
  btn: {
    padding: "5px 7px",
    boxShadow: "none",
    minWidth: "20px",
    lineHeight: "18px",
  },
}));

export default LayoutStyle;
