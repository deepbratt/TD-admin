import { Grid } from "@material-ui/core";
import Header from "../sections/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Grid container justifyContent="center">
        <Grid style={{ marginTop: "80px" }} item xs={12}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
