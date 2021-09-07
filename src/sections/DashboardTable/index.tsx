import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {
  ACTION,
  AD_ID,
  MAKE_MODEL,
  STATUS,
  USER_IMAGE,
} from "../../utils/constants/language/en/buttonLabels";

const DashboardTable: React.FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{AD_ID}</TableCell>
            <TableCell>{USER_IMAGE}</TableCell>
            <TableCell>{MAKE_MODEL}</TableCell>
            <TableCell>{STATUS}</TableCell>
            <TableCell align="center">{ACTION}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default DashboardTable;
