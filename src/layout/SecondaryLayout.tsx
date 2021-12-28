import { Paper } from "@material-ui/core";

interface SecondaryLayoutProps {
  children: React.ReactNode;
}
const SecondaryLayout = ({ children }: SecondaryLayoutProps) => {
  return (
    <Paper style={{ margin: "0", backgroundColor: "white", padding: "20px" }}>
      {children}
    </Paper>
  );
};

export default SecondaryLayout;
