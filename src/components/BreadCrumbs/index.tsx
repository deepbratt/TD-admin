import { Route } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { HOME } from "../../utils/constants/language/en/buttonLabels";

export interface BreadCrumbsProps {}

const BreadCrumbs: React.FC<BreadCrumbsProps> = () => {
  return (
    <Route>
      {({ location }) => {
        const pathnames = location.pathname.split("/").filter((x) => x);
        return (
          <Breadcrumbs
            aria-label="Breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
          >
            <RouterLink color="inherit" to="/">
              <Typography color="textSecondary" variant="body2">
                {HOME}
              </Typography>
            </RouterLink>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;

              return last ? (
                <Typography
                  style={{ textTransform: "capitalize" }}
                  color="textPrimary"
                  key={to}
                >
                  {value}
                </Typography>
              ) : (
                <RouterLink
                  style={{ textTransform: "capitalize" }}
                  color="inherit"
                  to={to}
                  key={to}
                >
                  {value}
                </RouterLink>
              );
            })}
          </Breadcrumbs>
        );
      }}
    </Route>
  );
};

export default BreadCrumbs;
