import { useState } from "react";
import PinInput from "react-pin-input";
import { useHistory } from "react-router";
import CustomButton from "../../components/CustomButton";
import { paths } from "../../routes/paths";
import { VERIFY } from "../../utils/constants/language/en/buttonLabels";
import { Grid } from "@material-ui/core";
import { Colors } from "../../theme/themeConstants";

export interface CodeVerficationProps {
  setPin: Function;
  pin: any;
}

export const regex = /^[ A-Za-z0-9_@./#&+-]*$/;

export const pinStyle = {
  borderColor: Colors.navyBlue,
  fontSize: "30px",
  margin: "11px",
  padding: "5px",
  borderRadius: "5px",
};
export const err = {
  borderColor: Colors.red,
  fontSize: "30px",
  margin: "11px",
  padding: "5px",
  borderRadius: "5px",
};

const CodeVerfication: React.FC<CodeVerficationProps> = ({ pin, setPin }) => {
  const history = useHistory();
  const [pinError, setPinError] = useState(false);

  const handleSubmit = () => {
    if (pin === undefined || pin.length !== 4) {
      setPinError(true);
    } else {
      setPinError(false);
      history.push(paths.forgotPassword + paths.resetPassword);
    }
  };

  return (
    <Grid container justifyContent="center" direction="column">
      <Grid
        item
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <PinInput
          length={4}
          onChange={(pin: string) => setPin(pin)}
          inputMode="numeric"
          style={{ padding: "5px", marginBottom: "10px" }}
          inputStyle={err ? pinStyle : err}
          autoSelect={true}
          regexCriteria={regex}
        />
      </Grid>
      <CustomButton
        color="secondary"
        disabled={pinError || pin.length !== 4}
        onClick={() => handleSubmit()}
      >
        {VERIFY}
      </CustomButton>
    </Grid>
  );
};

export default CodeVerfication;
