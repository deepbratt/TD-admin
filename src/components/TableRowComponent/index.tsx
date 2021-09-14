import {
  Avatar,
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import {
  AccountCircle,
  AddCircleOutline,
  BlockRounded,
  Delete,
  PlaylistAddCheck,
  RemoveCircleOutline,
} from "@material-ui/icons";
import { useHistory } from "react-router";
import ConfirmationDialog from "../ConfirmationDialog";
import Loader from "../Loader";
import Toast from "../Toast";
import styles from "./styles";
import useTableRowComponent from "./useTableRowComponent";

const TableRowComponent = ({ data }: any) => {
  const {
    isActive,
    toggleActive,
    toggleBan,
    deleteUser,
    isBanned,
    toastOpen,
    setToastOpen,
    toastType,
    toastMessage,
    isLoading,
    deleteDialog,
    setDeleteDialog,
  } = useTableRowComponent(data);
  const row = data;
  const classes = styles();
  const history = useHistory()
  return (
    <TableRow key={row._id} onClick={()=>history.push('/user/'+row._id)} style={{cursor:"pointer"}} hover>
      <TableCell component="th" scope="row">
        <div className={classes.usernameRow}>
          {row.image ? (
            <Avatar
              src={row.image}
              alt={row.firstName}
              className={classes.profilePic}
            />
          ) : (
            <AccountCircle fontSize="large" />
          )}
          <Typography variant="body2" className={classes.usernameRow}>
            {row.username}
          </Typography>
        </div>
      </TableCell>
      <TableCell>{row.email ? row.email : "Not Available"}</TableCell>
      <TableCell>{row.phone ? row.phone : "Not Available"}</TableCell>
      <TableCell>
        <Chip
          label={isBanned ? "Banned" : isActive ? "Active" : "Inactive"}
          className={
            isBanned
              ? classes.chipBanned
              : isActive
              ? classes.chipActive
              : classes.chipInActive
          }
        />
      </TableCell>
      <TableCell>
        <div className={classes.actionBtn}>
          <IconButton
            className={classes.actionIconBtn}
            title={isBanned ? " Unban" : "Ban"}
            size="small"
            onClick={toggleBan}
          >
            {isBanned ? (
              <PlaylistAddCheck color="primary" />
            ) : (
              <BlockRounded color={"error"} />
            )}
          </IconButton>
          <IconButton
            className={classes.actionIconBtn}
            size="small"
            title={isActive ? "Inactive" : "Active"}
            onClick={toggleActive}
          >
            {isActive ? (
              <RemoveCircleOutline color={"error"} />
            ) : (
              <AddCircleOutline color="primary" />
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
        message={"Are you sure you want to delete this user permenantly?"}
        rejectBtnLabel={"No"}
        confirmBtnLabel={"Yes"}
        handleConfirmation={deleteUser}
        handleRejection={() => {
          setDeleteDialog(false);
        }}
      />
    </TableRow>
  );
};

export default TableRowComponent;
