import { lazy } from "react";
const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login"));
const AdminUsers = lazy(() => import("../pages/adminUsers"));
const Advertisements = lazy(() => import("../pages/advertisements"));
const CarDetail = lazy(() => import("../pages/carDetail"));
const AddEditCar = lazy(() => import("../pages/AddEditCar"));
const Users = lazy(() => import("../pages/Users"));
const UserDetail = lazy(() => import("../pages/UserDetail"));

export const paths = {
  home: "/",
  dashboard: "/dashboard",
  admin: "/admin",
  login: "/login",
  forgotPassword: "/forgot-password",
  adverstisements: "/advertisements",
  carDetail: "/car/:id",
  addEditCar: "/add-edit/car/",
  clientUsers: "/users",
  userDetail:"/user",
};

export const routes = {
  home: "/",
  dashboard: "/dashboard",
  admin: "/admin",
  login: "/login",
  advertisements: "/advertisements",
  carDetail: "/car/:id",
  addEditCar: "/add-edit/car/:id?",
  clientUsers:"/users",
  userDetail:"/user/:id?",
};

export const privateRoutes = {
  [paths.home]: {
    name: "Home",
    path: routes.home,
    component: Home,
  },
  [paths.dashboard]: {
    name: "Dashboard",
    path: routes.dashboard,
    component: Home,
  },
  [paths.admin]: {
    name: "Admin",
    path: routes.admin,
    component: AdminUsers,
  },
  [paths.adverstisements]: {
    name: "Advertisements",
    path: routes.advertisements,
    component: Advertisements,
  },
  [paths.carDetail]: {
    name: "Car Detail",
    path: routes.carDetail,
    component: CarDetail,
  },
  [paths.addEditCar]: {
    name: "Add Edit Car",
    path: routes.addEditCar,
    component: AddEditCar,
  },
  [paths.clientUsers]: {
    name: "Client Users",
    path: routes.clientUsers,
    component: Users,
  },
  [paths.userDetail]: {
    name: "User",
    path: routes.userDetail,
    component: UserDetail,
  },
};

export const publicRoutes = {
  [paths.login]: {
    name: "Login",
    path: routes.login,
    component: Login,
  },
};
