import { lazy } from "react";
const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login"));
const Advertisements = lazy(() => import("../pages/advertisements"));
const CarDetail = lazy(() => import("../pages/carDetail"));

export const paths = {
  home: "/",
  dashboard: "/dashboard",
  login: "/login",
  forgotPassword: "/forgot-password",
  adverstisements: "/advertisements",
  carDetail: "/car/:id",
};

export const routes = {
  home: "/",
  dashboard: "/dashboard/:id",
  login: "/login",
  advertisements: "/advertisements",
  carDetail: "/car/:id",
};

export const privateRoutes = {
  [paths.home]: {
    name: "Home",
    path: routes.home,
    component: Home,
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
};

export const publicRoutes = {
  [paths.login]: {
    name: "Login",
    path: routes.login,
    component: Login,
  },
};
