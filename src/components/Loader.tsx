import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "../theme/themeConstants";
interface LoaderProps {
  open: boolean;
  isBackdrop?: boolean;
}
const Loader = ({ open, isBackdrop = true }: LoaderProps) => {
  const classes = useStyles();
  if (!open) {
    return null;
  }
  if (isBackdrop) {
    return (
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="primary" />
      </Backdrop>
    );
  }
  return (
    <div className={classes.root}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default Loader;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: Colors.white,
      backgroundColor: Colors.white,
    },
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "70vh",
      backgroundColor: Colors.grey,
    },
  })
);
