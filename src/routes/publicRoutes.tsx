import { Route, RouteProps } from "react-router-dom";

export type ProtectedRouteProps = {
  component: React.ComponentType;
} & RouteProps;

export default function PublicRoutes({
  component: Component,
  ...routeProps
}: ProtectedRouteProps) {
  return <Route {...routeProps} render={(props) => <Component {...props} />} />;
}
