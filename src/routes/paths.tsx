import { lazy } from "react";
const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login"));
const AdminUsers = lazy(() => import("../pages/adminUsers"));
const Advertisements = lazy(() => import("../pages/advertisements"));
const CarDetail = lazy(() => import("../pages/carDetail"));
const AddEditCar = lazy(() => import("../pages/AddEditCar"));
const Users = lazy(() => import("../pages/Users"));
const UserDetail = lazy(() => import("../pages/UserDetail"));
const CarMakes = lazy(() => import("../pages/CarMakes"));

export const paths = {
  home: "/",
  dashboard: "/dashboard",
  admin: "/admin",
  login: "/login",
  forgotPassword: "/forgot-password",
  adverstisements: "/advertisements",
  carDetail: "/car/:id",
  addCar: "/add/car/",
  editCar:"/edit/car/",
  clientUsers: "/users",
  userDetail:"/user",
  carMakes:"/car-makes",
};

export const routes = {
  home: "/",
  dashboard: "/dashboard",
  admin: "/admin",
  login: "/login",
  advertisements: "/advertisements",
  carDetail: "/car/:id",
  addCar: "/add/car/:userId?",
  editCar: "/edit/car/:id?",
  clientUsers:"/users",
  userDetail:"/user/:id?",
  carMakes:"/car-makes",
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
  [paths.addCar]: {
    name: "Add Car",
    path: routes.addCar,
    component: AddEditCar,
  },
  [paths.editCar]: {
    name: "Edit Car",
    path: routes.editCar,
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
  [paths.carMakes]: {
    name: "Car Makes",
    path: routes.carMakes,
    component: CarMakes,
  },
};

export const publicRoutes = {
  [paths.login]: {
    name: "Login",
    path: routes.login,
    component: Login,
  },
};
