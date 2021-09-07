import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Drawer,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useState } from "react";
import SideBar from "../SiderBar";

const HeaderStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerPaper: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Header = () => {
  const { toolbar, drawerPaper } = HeaderStyles();
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <AppBar color="inherit">
      <Toolbar className={toolbar}>
        <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
      <Drawer
        classes={{
          paper: drawerPaper,
        }}
        open={open}
        onClose={toggleDrawer}
      >
        <SideBar />
      </Drawer>
    </AppBar>
  );
};

export default Header;
