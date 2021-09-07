import {
  AppBar,
  Typography,
  IconButton,
  makeStyles,
  Toolbar,
  Drawer,
} from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useState } from "react";
import SideBar from "../SiderBar";

const drawerWidth = 240;

const HeaderStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Header = () => {
  const { appBar, toolbar, drawer, drawerPaper } = HeaderStyles();

  return (
    <AppBar color="inherit" className={appBar}>
      <Toolbar className={toolbar}>
        <Typography variant="h6" noWrap>
          Tez Dealz Admin Panel
        </Typography>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
      <Drawer
        className={drawer}
        variant="permanent"
        classes={{
          paper: drawerPaper,
        }}
      >
        <SideBar />
      </Drawer>
    </AppBar>
  );
};

export default Header;
