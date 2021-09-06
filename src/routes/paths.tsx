import { lazy } from "react";
const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login"));

export const paths = {
  home: "/",
  dashboard: "/dashboard",
  login: "/login",
};

export const routes = {
  home: "/",
  dashboard: "/dashboard/:id",
  login: "/login",
};

export const privateRoutes = {
  [paths.home]: {
    name: "Home",
    path: routes.home,
    component: Home,
  },
};

export const publicRoutes = {
  [paths.login]: {
    name: "Login",
    path: routes.login,
    component: Login,
  },
};
