import { lazy } from "react";
const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login"));
const Advertisements = lazy(() => import("../pages/advertisements"));

export const paths = {
  home: "/",
  dashboard: "/dashboard",
  login: "/login",
  forgotPassword: "/forgot-password",
  adverstisements: "/advertisements"
};

export const routes = {
  home: "/",
  dashboard: "/dashboard/:id",
  login: "/login",
  advertisements: "/advertisements",
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
};

export const publicRoutes = {
  [paths.login]: {
    name: "Login",
    path: routes.login,
    component: Login,
  },
};
