import { Route, RouteProps } from "react-router-dom";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import Layout from "../layout";
import { RootState } from "../redux/store";
import { paths } from "./paths";

export type ProtectedRouteProps = {
  component: React.ComponentType;
} & RouteProps;

export default function PublicRoutes({
  component: Component,
  ...routeProps
}: ProtectedRouteProps) {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  return (
    <>
      {!isLoggedIn ? (
        <Route
          {...routeProps}
          render={(props) => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ) : (
        <Redirect to={paths.home} />
      )}
    </>
  );
}
