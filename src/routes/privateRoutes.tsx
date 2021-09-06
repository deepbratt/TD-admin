import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../layout";
import { RootState } from "../redux/store";
import { paths } from "./paths";

export type ProtectedRouteProps = {
  component: React.ComponentType;
} & RouteProps;

const PrivateRoutes = ({
  component: Component,
  ...routeProps
}: ProtectedRouteProps) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  return (
    <Route
      {...routeProps}
      render={(props) =>
        isLoggedIn ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to={paths.login} />
        )
      }
    />
  );
};

export default PrivateRoutes;
