import { Grid } from "@material-ui/core";
import Header from "../sections/Header";
import { Colors } from "../theme/themeConstants";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ backgroundColor: Colors.background, minHeight: "100vh" }}>
      <Header />
      <Grid container justifyContent="center">
        <Grid style={{ marginTop: "80px" }} item xs={12}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
