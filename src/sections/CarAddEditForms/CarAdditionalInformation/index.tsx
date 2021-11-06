import addEditCarData from "../../../utils/constants/language/en/addEditCarData";
import {
  Checkbox,
  createStyles,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import SelectInputComponent from "../../../components/SelectInputComponent";
import useCarAdditionalInformation from "./useCarAdditionalInformation";

interface CarAdditionalInformationProps {
  formData: any;
  handleChange: (event: any) => void;
  requireError: any;
  setFormData: React.Dispatch<any>;
  bodyTypesArray: Array<string>;
  featuresArray: Array<string>;
  handleChangeSelect: any;
}

const CarAdditionalInformation = ({
  formData,
  handleChange,
  requireError,
  setFormData,
  featuresArray,
  bodyTypesArray,
  handleChangeSelect,
}: CarAdditionalInformationProps) => {
  const classes = useStyles();
  const { handleChangeCheckBoxes } = useCarAdditionalInformation(
    formData,
    setFormData
  );
  // const onlyUnique = (value: string, index:number, self: Array<string>)=> {
  //   return self.indexOf(value) === index;
  // }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={6}>
        <SelectInputComponent
          dataArray={addEditCarData.fields.engineType.menu.sort()}
          name={"engineType"}
          className={classes.selectFields}
          value={formData.engineType}
          label={addEditCarData.fields.engineType.label}
          required
          error={requireError.engineType}
          helperText={
            requireError.engineType ? addEditCarData.requiredFieldText : ""
          }
          handleChangeSelect={handleChangeSelect}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          name={"engineCapacity"}
          type="number"
          className={classes.selectFields}
          value={formData.engineCapacity}
          label={addEditCarData.fields.engineCapacity.label}
          required
          error={requireError.engineCapacity}
          helperText={
            requireError.engineCapacity ? addEditCarData.requiredFieldText : ""
          }
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <SelectInputComponent
          dataArray={addEditCarData.fields.transmission.menu.sort()}
          name={"transmission"}
          className={classes.selectFields}
          value={formData.transmission}
          label={addEditCarData.fields.transmission.label}
          required
          error={requireError.transmission}
          helperText={
            requireError.transmission ? addEditCarData.requiredFieldText : ""
          }
          handleChangeSelect={handleChangeSelect}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <SelectInputComponent
          dataArray={addEditCarData.fields.assembly.menu.sort()}
          name={"assembly"}
          className={classes.selectFields}
          value={formData.assembly}
          label={addEditCarData.fields.assembly.label}
          required
          error={requireError.assembly}
          helperText={
            requireError.assembly ? addEditCarData.requiredFieldText : ""
          }
          handleChangeSelect={handleChangeSelect}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <SelectInputComponent
          dataArray={bodyTypesArray.sort()}
          name={"bodyType"}
          className={classes.selectFields}
          value={formData.bodyType}
          label={addEditCarData.fields.bodyType.label}
          required
          error={requireError.bodyType}
          helperText={
            requireError.bodyType ? addEditCarData.requiredFieldText : ""
          }
          handleChangeSelect={handleChangeSelect}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <SelectInputComponent
          dataArray={addEditCarData.fields.bodyCondition.menu}
          name={"bodyCondition"}
          className={classes.selectFields}
          value={formData.bodyCondition}
          label={addEditCarData.fields.bodyCondition.label}
          required
          error={requireError.bodyCondition}
          helperText={
            requireError.bodyCondition ? addEditCarData.requiredFieldText : ""
          }
          handleChangeSelect={handleChangeSelect}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <SelectInputComponent
          dataArray={addEditCarData.fields.sellerType.menu.sort()}
          name={"sellerType"}
          className={classes.selectFields}
          value={formData.sellerType}
          label={addEditCarData.fields.sellerType.label}
          required
          error={requireError.sellerType}
          helperText={
            requireError.sellerType ? addEditCarData.requiredFieldText : ""
          }
          handleChangeSelect={handleChangeSelect}
        />
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <Typography variant="body1" className={classes.checkBoxLabel}>
            Features
          </Typography>
        </Grid>
        {featuresArray.map((feature: string, index: number) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            style={{ display: "flex" }}
            key={"cai-features" + index}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.features.indexOf(feature) > -1}
                  onChange={handleChangeCheckBoxes}
                  name={feature}
                />
              }
              label={
                <Typography variant="body1" className={classes.checkBoxLabel}>
                  {feature}
                </Typography>
              }
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default CarAdditionalInformation;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sterik: {
      color: "red",
    },
    selectFields: {
      width: "100%",
    },
    inputLabel: {
      fontSize: "16px",
      color: "black",
    },
    checkBoxLabel: {
      color: "black",
    },
  })
);
