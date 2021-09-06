import { Grid } from "@material-ui/core";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <Grid container>{children}</Grid>;
};

export default Layout;
