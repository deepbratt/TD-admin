import { Button } from "@material-ui/core";
import {
  AddCircleOutline,
  Block,
  Delete,
  Message,
  Phone,
  PlaylistAddCheck,
  RemoveCircleOutline,
} from "@material-ui/icons";
import {
  ACTIVE,
  BAN,
  DELETE,
  INACTIVE,
  UNBAN,
} from "../../utils/constants/language/en/buttonLabels";

interface ActionButtonsProps {
  isActive: boolean;
  isBanned: boolean;
  result: any;
  deleteAd: () => void;
  toggleActive: () => void;
  toggleBan: () => void;
}

const ActionButtons = ({
  isBanned,
  isActive,
  result,
  deleteAd,
  toggleActive,
  toggleBan,
}: ActionButtonsProps) => {
  return (
    <>
      <a href={"tel:" + result.createdBy.phone}>
        <Button startIcon={<Phone />} fullWidth variant="contained">
          {result.createdBy.phone}
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
          startIcon={<Delete color="error" />}
          variant="contained"
          onClick={() => deleteAd()}
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
      </div>
    </>
  );
};

export default ActionButtons;
