import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Drawer,
  Menu,
  MenuItem,
} from "@material-ui/core";
import SideBar from "../SiderBar";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { paths } from "../../routes/paths";
import { useHistory } from "react-router";
import { LOGOUT } from "../../utils/constants/language/en/buttonLabels";
import { logout } from "../../redux/reducers/authSlice";

const HeaderStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  root: {
    display: "flex",
  },
  drawerPaper: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Header = () => {
  const { toolbar, drawerPaper } = HeaderStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const toggleDrawer = () => {
    setOpen(!open);
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
    <>
      <AppBar color="inherit" position="fixed">
        <Toolbar className={toolbar}>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
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
      {renderMenu}
    </>
  );
};

export default Header;
