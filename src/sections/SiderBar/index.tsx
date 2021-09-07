import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { MenuItems, IMenuItem } from "./menuItems";
import Logo from "../../assets/icons/logo.png";
import { Colors } from "../../theme/themeConstants";

const SideBarStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    backgroundColor: Colors.white,
  },
}));

const SideBar: React.FC = () => {
  const { toolbar, selected } = SideBarStyles();
  const history = useHistory();
  return (
    <div>
      <div className={toolbar}>
        <img height="50px" src={Logo} alt="Tez Dealz logo" />
      </div>
      <Divider style={{ backgroundColor: Colors.white }} />
      <List style={{ width: 240 }}>
        {MenuItems.map((menuItem: IMenuItem) => (
          <ListItem
            style={{ color: Colors.white }}
            classes={{
              selected: selected,
            }}
            button
            key={`menu-Item-${menuItem.text}`}
            onClick={() => history.push(menuItem.link)}
          >
            <ListItemIcon style={{ color: Colors.white }}>
              <menuItem.icon />
            </ListItemIcon>
            <ListItemText
              primary={menuItem.text}
              style={{ color: Colors.white }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SideBar;
