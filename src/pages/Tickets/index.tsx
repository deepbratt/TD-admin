import {
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import SecondaryLayout from "../../layout/SecondaryLayout";
import useTickets from "./useTickets";
import PageHeader from "../../sections/PageHeader";
import CustomDivider from "../../components/CustomDivider";
import { Pagination } from "@material-ui/lab";
import HeaderSearch from "../../components/HeaderSearch";
import SelectComponent from "../../components/SelectComponent";
import NoResults from "../../components/NoResults";
import TicketsTableRows from "../../sections/TicketsTableRows";

const Tickets = () => {
  const {
    isLoading,
    toastMessage,
    toastOpen,
    setToastOpen,
    toastType,
    result,
    setResult,
    pageCount,
    getTickets,
    handleChange,
    filters,
    setKeywords,
  } = useTickets();
  const headings = [
    "Type",
    "email",
    "phone",
    "Opened At",
    "Closed At",
    "Status",
    "Actions",
  ];
  const classes = styles();
  return (
    <SecondaryLayout>
      <Grid container spacing={1}>
        <PageHeader heading="Tickets">
          <SelectComponent
            menuItem={["All", "opened", "closed"]}
            label="Status"
            name="ticketStatus"
            onChange={handleChange}
            value={filters.ticketStatus}
            InputProps={{
              classes: {
                input: classes.inputStyle,
              },
            }}
          />
          <SelectComponent
            menuItem={[
              "All",
              "Advertisement Assistance",
              "Technical Assistance",
            ]}
            label="Type"
            name="ticketType"
            onChange={handleChange}
            value={filters.ticketType}
            InputProps={{
              classes: {
                input: classes.inputStyle,
              },
            }}
          />
          <HeaderSearch setKeywords={setKeywords} getResults={getTickets} />
        </PageHeader>
        <CustomDivider />
        <Grid item xs={12}>
          {result.length > 0 && (
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {headings.map((heading: string, index: number) => (
                      <TableCell key={heading + index}>{heading}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {result.map((row: any, index: number) => (
                    <TicketsTableRows
                      data={row}
                      resultArray={result}
                      setResultArray={setResult}
                      key={index + row._id}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {result.length < 1 && <NoResults />}
        </Grid>
        <Grid item container xs={12} justifyContent="flex-end">
          <Pagination
            count={pageCount}
            onChange={(event, value) => getTickets(value)}
            color="secondary"
          />
        </Grid>
      </Grid>
      <Loader open={isLoading} />
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        type={toastType}
        message={toastMessage}
      />
    </SecondaryLayout>
  );
};

export default Tickets;

const styles = makeStyles({
  inputStyle: {
    padding: "5px",
  },
});
