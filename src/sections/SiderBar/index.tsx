import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { useHistory } from "react-router";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { MenuItems, IMenuItem } from "./menuItems";
import Logo from "../../assets/icons/logo.png";

const SideBarStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  listItemStyles: {
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      "& > span, *": {
        color: theme.palette.common.black,
      },
    },
  },
}));

interface ISidebarProps {
  open: boolean;
  handleDrawerClose: Function;
}

const SideBar: React.FC<ISidebarProps> = ({ open, handleDrawerClose }) => {
  const { toolbar, listItemStyles } = SideBarStyles();
  const history = useHistory();
  const theme = useTheme();
  return (
    <div>
      <div className={toolbar}>
        <img
          style={{ visibility: open ? "visible" : "hidden" }}
          height="50px"
          src={Logo}
          alt="Tez Dealz logo"
        />
        <div>
          <IconButton
            style={{ color: "white" }}
            onClick={() => handleDrawerClose()}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
      <Divider style={{ backgroundColor: theme.palette.common.white }} />
      <List>
        {MenuItems.map((menuItem: IMenuItem) => (
          <ListItem
            className={listItemStyles}
            button
            key={`menu-Item-${menuItem.text}`}
            onClick={() => history.push(menuItem.link)}
          >
            <ListItemIcon style={{ color: theme.palette.common.white }}>
              <menuItem.icon />
            </ListItemIcon>
            <ListItemText
              primary={menuItem.text}
              style={{ color: theme.palette.common.white }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SideBar;
