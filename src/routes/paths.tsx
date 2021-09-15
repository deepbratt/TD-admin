import { lazy } from "react";
const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login"));
const AdminUsers = lazy(() => import("../pages/adminUsers"));
const Settings = lazy(() => import("../pages/settings"));
const Advertisements = lazy(() => import("../pages/advertisements"));
const CarDetail = lazy(() => import("../pages/carDetail"));
const AddEditCar = lazy(() => import("../pages/AddEditCar"));
const Users = lazy(() => import("../pages/Users"));
const UserDetail = lazy(() => import("../pages/UserDetail"));
const CarMakes = lazy(() => import("../pages/CarMakes"));
const CarModels = lazy(() => import("../pages/CarModels"));
const CarVersions = lazy(() => import("../pages/CarVersions"));
const CarBodyTypes = lazy(() => import("../pages/CarBodyTypes"));
const CarFeatures = lazy(() => import("../pages/CarFeatures"));

export const paths = {
  home: "/",
  dashboard: "/dashboard",
  admin: "/admin",
  login: "/login",
  setting: "/settings",
  forgotPassword: "/forgot-password",
  adverstisements: "/advertisements",
  carDetail: "/car/:id",
  addCar: "/add/car/",
  editCar: "/edit/car/",
  clientUsers: "/users",
  userDetail:"/user",
  carMakes:"/car-makes",
  carModel:"/car-models/:id",
  carVersions:"/car-versions/:id",
  carBodyTypes:"/car-body-types/",
  carFeatures:"/car-features/",
};

export const routes = {
  home: "/",
  dashboard: "/dashboard",
  admin: "/admin",
  login: "/login",
  setting: "/settings/:id?",
  advertisements: "/advertisements",
  carDetail: "/car/:id",
  addCar: "/add/car/:userId?",
  editCar: "/edit/car/:id?",
  clientUsers:"/users",
  userDetail:"/user/:id?",
  carMakes:"/car-makes",
  carModels:"/car-models/:id",
  carVersions:"/car-versions/:id",
  carBodyTypes:"/car-body-types/",
  carFeatures:"/car-features/",
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
  [paths.setting]: {
    name: "User Settings",
    path: routes.setting,
    component: Settings,
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
  [paths.carModel]: {
    name: "Car Models",
    path: routes.carModels,
    component: CarModels,
  },
  [paths.carVersions]: {
    name: "Car Versions",
    path: routes.carVersions,
    component: CarVersions,
  },
  [paths.carBodyTypes]: {
    name: "Car Body Types",
    path: routes.carBodyTypes,
    component: CarBodyTypes,
  },
  [paths.carFeatures]: {
    name: "Car Features",
    path: routes.carFeatures,
    component: CarFeatures,
  },
};

export const publicRoutes = {
  [paths.login]: {
    name: "Login",
    path: routes.login,
    component: Login,
  },
};
