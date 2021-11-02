import { Button } from "@material-ui/core";
import {
  AddCircleOutline,
  Block,
  Delete,
  Message,
  MonetizationOn,
  MoneyOff,
  Phone,
  PlaylistAddCheck,
  RemoveCircleOutline,
} from "@material-ui/icons";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import addEditCarData from "../../utils/constants/language/en/addEditCarData";
import {
  ACTIVE,
  BAN,
  DELETE,
  INACTIVE,
  SOLD,
  SOLD_HERE_DIALOG_OK,
  SOLD_HERE_DIALOG_REJECT,
  UNBAN,
  UNSOLD,
} from "../../utils/constants/language/en/buttonLabels";
import {
  SOLD_HERE_DIALOG_MESSAGE,
  SOLD_HERE_DIALOG_TITLE,
} from "../../utils/constants/language/en/text";

interface ActionButtonsProps {
  isActive: boolean;
  isBanned: boolean;
  isSold: boolean;
  result: any;
  deleteAd: () => void;
  toggleActive: () => void;
  toggleBan: () => void;
  toggleSold: (soldHere?: boolean) => void;
  deleteDialog: boolean;
  setDeleteDialog: (value: React.SetStateAction<boolean>) => void;
  setSellDialog: (value: React.SetStateAction<boolean>) => void;
  sellDialog: boolean;
}

const ActionButtons = ({
  isBanned,
  isActive,
  result,
  deleteAd,
  toggleActive,
  toggleBan,
  toggleSold,
  deleteDialog,
  setDeleteDialog,
  isSold,
  setSellDialog,
  sellDialog,
}: ActionButtonsProps) => {
  return (
    <>
      <a href={"tel:" + result.createdBy.phone}>
        <Button startIcon={<Phone />} fullWidth variant="contained">
          {result.associatedPhone || result.createdBy.phone}
        </Button>
      </a>
      {result.createdBy.email && (
        <a href={"mailto:" + result.createdBy.email}>
          <Button
            startIcon={<Message />}
            fullWidth
            variant="contained"
            style={{ marginTop: 20, textTransform: "lowercase" }}
            color="secondary"
          >
            {result.createdBy.email}
          </Button>
        </a>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Button
          startIcon={
            isBanned ? (
              <PlaylistAddCheck color="primary" />
            ) : (
              <Block color="error" />
            )
          }
          variant="contained"
          onClick={() => toggleBan()}
          color="secondary"
        >
          {isBanned ? UNBAN : BAN}
        </Button>
        <Button
          startIcon={
            isSold ? (
              <MoneyOff color="error" />
            ) : (
              <MonetizationOn color="primary" />
            )
          }
          variant="contained"
          onClick={isSold ? () => toggleSold() : () => setSellDialog(true)}
          color="secondary"
        >
          {isSold ? UNSOLD : SOLD}
        </Button>
        <Button
          startIcon={<Delete color="error" />}
          variant="contained"
          onClick={() => setDeleteDialog(true)}
          color="secondary"
        >
          {DELETE}
        </Button>
        <Button
          startIcon={
            !isActive ? (
              <AddCircleOutline color="primary" />
            ) : (
              <RemoveCircleOutline color="error" />
            )
          }
          variant="contained"
          onClick={() => toggleActive()}
          color="secondary"
        >
          {!isActive ? ACTIVE : INACTIVE}
        </Button>
        <ConfirmationDialog
          open={deleteDialog}
          title={addEditCarData.deleteDialogTitle}
          message={addEditCarData.deleteDialogMessage}
          rejectBtnLabel={addEditCarData.buttons.cancelDelete}
          confirmBtnLabel={addEditCarData.buttons.confirmDelete}
          handleConfirmation={deleteAd}
          handleRejection={() => setDeleteDialog(false)}
        />
        <ConfirmationDialog
          handleConfirmation={() => toggleSold(true)}
          handleRejection={() => toggleSold(false)}
          open={sellDialog}
          message={SOLD_HERE_DIALOG_MESSAGE}
          title={SOLD_HERE_DIALOG_TITLE}
          confirmBtnLabel={SOLD_HERE_DIALOG_OK}
          rejectBtnLabel={SOLD_HERE_DIALOG_REJECT}
        />
      </div>
    </>
  );
};

export default ActionButtons;
