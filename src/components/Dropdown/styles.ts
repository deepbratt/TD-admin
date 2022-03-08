import makeStyles from "@material-ui/core/styles/makeStyles";
const LayoutStyle = makeStyles((theme) => ({
  root: {},
  input: {
    [theme.breakpoints.down("md")]: {
      fontSize: "16px",
      backgroundcolor:"white"
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
  btn: {},
}));

export default LayoutStyle;
