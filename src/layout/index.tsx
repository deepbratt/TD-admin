import { Grid } from "@material-ui/core";
import Header from "../sections/Header";
import SideBarPersist from "../sections/SiderBar/SideBarPersist";
import { Colors } from "../theme/themeConstants";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ backgroundColor: Colors.background, minHeight: "100vh" }}>
      {/* <Header /> */}
      <SideBarPersist>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </SideBarPersist>
    </div>
  );
};

export default Layout;
