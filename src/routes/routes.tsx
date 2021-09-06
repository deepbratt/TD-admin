import { Suspense } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoutes from "./privateRoutes";
import PublicRoutes from "./publicRoutes";
import { privateRoutes, publicRoutes } from "./paths";

const Routes = () => {
  const _privateRoutes = Object.values(privateRoutes);
  const _publicRoutes = Object.values(publicRoutes);

  return (
    <Suspense fallback={<h1>Loading ...</h1>}>
      <Router>
        <Switch>
          {_privateRoutes.map((route) => (
            <PrivateRoutes
              path={route.path}
              component={route.component}
              key={`route-${route.name}`}
              exact
            />
          ))}
          {_publicRoutes.map((route) => (
            <PublicRoutes
              path={route.path}
              component={route.component}
              key={`route-${route.name}`}
              exact
            />
          ))}
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
