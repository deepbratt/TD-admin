import { Grid, Typography } from "@material-ui/core";

interface PageHeaderProps {
  heading: string;
  children?: React.ReactNode;
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const PageHeader = ({
  heading = "",
  children = <div></div>,
  component = "h2",
}: PageHeaderProps) => {
  return (
    <Grid container>
      <Grid
        item
        container
        xs={12}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} md={5}>
          <Typography variant={component} gutterBottom>
            {heading}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
