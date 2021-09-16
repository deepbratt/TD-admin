import {
  TableRow,
  TableCell,
  Chip,
  IconButton,
} from "@material-ui/core";
import {
  Delete,
  Lock,
  LockOpen,
} from "@material-ui/icons";
import moment from "moment";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import styles from "./styles";
import TicketDetailDialog from "./TicketDetailDialog";
import useTicketsTableRow from "./useTicketsTableRow";

interface QueriesTableRowProps {
  data: any;
  resultArray: Array<any>;
  setResultArray: React.Dispatch<React.SetStateAction<any[]>>;
}

const TicketsTableRows = ({
  data,
  resultArray,
  setResultArray,
}: QueriesTableRowProps) => {
  const row = data;
  const classes = styles();
  const {
    toggleStatus,
    deleteTicket,
    toastOpen,
    setToastOpen,
    toastType,
    toastMessage,
    isLoading,
    deleteDialog,
    setDeleteDialog,
    status,
    openDetail,
    setOpenDetail
  } = useTicketsTableRow(data, resultArray, setResultArray);
  return (
    <TableRow
      key={row._id}
      onClick={() => setOpenDetail(true)}
      style={{ cursor: "pointer" }}
      hover
    >
      <TableCell component="th" scope="row">
        {row.type}
      </TableCell>
      <TableCell>{row.email ? row.email : "Not Available"}</TableCell>
      <TableCell>{row.phone ? row.phone : "Not Available"}</TableCell>
      <TableCell>{moment(row.createdAt).format('DD MMM YY')}</TableCell>
      <TableCell>{status==="closed" ? moment(row.closedAt).format('DD MMM YY') : status}</TableCell>
      <TableCell>
        <Chip
          label={status}
          className={status === "opened" ? classes.chipOpen : classes.chipClose}
        />
      </TableCell>
      <TableCell>
        <div className={classes.actionBtn}>
          <IconButton
            className={classes.actionIconBtn}
            title={status==="opened" ? "Close" : "Open"}
            size="small"
            onClick={toggleStatus}
          >
            {status==="opened" ? (
              <Lock color="primary" />
            ) : (
              <LockOpen color={"error"} />
            )}
          </IconButton>
          <IconButton
            className={classes.actionIconBtn}
            size="small"
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteDialog(true);
            }}
          >
            <Delete color={"error"} />
          </IconButton>
        </div>
      </TableCell>
      <Loader open={isLoading} isBackdrop={true} />
      <Toast
        message={toastMessage}
        type={toastType}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
      />
      <ConfirmationDialog
        open={deleteDialog}
        title={"Delete Permenantly"}
        message={"Are you sure you want to delete this ticket permenantly?"}
        rejectBtnLabel={"No"}
        confirmBtnLabel={"Yes"}
        handleConfirmation={deleteTicket}
        handleRejection={() => {
          setDeleteDialog(false);
        }}
      />
      <TicketDetailDialog
        open={openDetail}
        title={"Ticket Detail"}
        detail={row}
        status={status}
        rejectBtnLabel={"Cancel"}
        confirmBtnLabel={status==="opened" ? "Close Ticket": "Open Ticket"}
        handleConfirmation={toggleStatus}
        handleRejection={() => {
          setOpenDetail(false);
        }}
      />
    </TableRow>
  );
};

export default TicketsTableRows;
