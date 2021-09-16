import { makeStyles } from "@material-ui/core";
import MUITheme from "../../theme/theme";

const styles = makeStyles(() => ({
  usernameRow: { display: "flex", alignItems: "center" },
  profilePic: { marginRight: "5px" },
  username: { marginLeft: "10px" },
  actionBtn: { display: "flex", justifyContent: "space-around" },
  actionIconBtn: { backgroundColor: MUITheme.palette.secondary.main },
  chipBanned: {
    backgroundColor: "#FFBEBE",
    color: "#C20000",
  },
  chipOpen: {
    backgroundColor: "#FFBEBE",
    color: "#C20000",
  },
  chipInActive: {
    backgroundColor: "#BAFFC9",
    color: "#27442D",
  },
  chipClose: {
    backgroundColor: "#BAFFC9",
    color: "#27442D",
  },
  chipActive: {
    backgroundColor: "#BAC1FF",
    color: "#182FFF",
  },
}));

export default styles;