import { Grid, Typography } from "@material-ui/core";

interface PageHeaderProps {
  heading: string;
  children?: React.ReactNode;
}

const PageHeader = ({
  heading = "",
  children = <div></div>,
}: PageHeaderProps) => {
  return (
    <Grid container>
      <Grid
        item
        container
        xs={12}
        justifyContent= "space-between"
        alignItems="center"
      >
        <Typography variant="h3">{heading}</Typography>
        {children}
      </Grid>
    </Grid>
  );
};

export default PageHeader;
