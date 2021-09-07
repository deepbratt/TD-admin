import { Grid } from "@material-ui/core";
import Header from "../sections/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Grid container>{children}</Grid>
    </>
  );
};

export default Layout;
