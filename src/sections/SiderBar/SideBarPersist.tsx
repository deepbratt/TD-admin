import React, { useState } from "react";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { IMenuItem, MenuItems } from "./menuItems";
import { Colors } from "../../theme/themeConstants";
import { useHistory, useLocation } from "react-router";
import { AccountCircle } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { Menu, MenuItem } from "@material-ui/core";
import { paths } from "../../routes/paths";
import { logout } from "../../redux/reducers/authSlice";
import { LOGOUT } from "../../utils/constants/language/en/buttonLabels";
import Logo from "../../assets/icons/logo.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      backgroundColor: theme.palette.secondary.main,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      backgroundColor: theme.palette.secondary.main,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    selected: {
      backgroundColor: Colors.white,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawerPaper: {
      backgroundColor: theme.palette.secondary.main,
    },
    listItemIcon: {
      color: Colors.white,
    },
    listItem: {
      color: Colors.white,
      "&:hover": {
        color: theme.palette.primary.main,
        background: Colors.white,
        "& $listItemIcon": {
          color: theme.palette.primary.main,
        },
      },
    },
    selectedListItem: {
      color: Colors.white,
      background: theme.palette.primary.main,
      "&:hover": {
        color: theme.palette.secondary.main,
        background: Colors.white,
        "& $listItemIcon": {
          color: theme.palette.secondary.main,
        },
      },
    },
  })
);

interface sideBarProps {
  children: React.ReactNode;
}

const SideBarPersist = ({ children }: sideBarProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(true);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => history.push(paths.dashboard)}>Profile</MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(logout());
          handleMenuClose();
        }}
      >
        {LOGOUT}
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: open ? "flex-end" : "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            size="medium"
          >
            <AccountCircle fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        variant="permanent"
        color="primary"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <img
            height="50px"
            src={Logo}
            alt="Tez Dealz logo"
            style={{ margin: "auto" }}
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon color="primary" />
            ) : (
              <ChevronLeftIcon color="primary" />
            )}
          </IconButton>
        </div>
        <Divider style={{backgroundColor:Colors.white}}/>
        <List>
          {MenuItems.map((menuItem: IMenuItem) => (
            <ListItem
              // style={{ color: Colors.white }}
              className={
                pathname.toLowerCase().indexOf(menuItem.link) > -1
                  ? classes.selectedListItem
                  : classes.listItem
              }
              button
              key={`menu-Item-${menuItem.text}`}
              onClick={() => history.push(menuItem.link)}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <menuItem.icon />
              </ListItemIcon>
              <ListItemText primary={menuItem.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default SideBarPersist;
