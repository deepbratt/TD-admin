import addEditCarData from "../../utils/constants/language/en/addEditCarData";
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
import SelectComponent from "../../components/SelectComponent";

interface CarAdditionalInformationProps {
  formData: any;
  handleChange: (event: any) => void;
  requireError: any;
  setFormData: React.Dispatch<any>;
}

const CarAdditionalInformation = ({
  formData,
  handleChange,
  requireError,
  setFormData,
}: CarAdditionalInformationProps) => {
  const classes = useStyles();

  // const onlyUnique = (value: string, index:number, self: Array<string>)=> {
  //   return self.indexOf(value) === index;
  // }

  const handleChangeCheckBoxes = (e: any) => {
    let temp = formData.features;
    if (e.target.checked) {
      temp.push(e.target.name);
    } else {
      temp = temp.filter((item: string) => item !== e.target.name);
    }
    // console.log(e.target.name)
    setFormData({ name: "features", value: temp });
    // setFormData({ name: arrayName, value: temp });
    console.log(temp);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={6}>
        <SelectComponent
          menuItem={addEditCarData.fields.engineType.menu}
          name={"engineType"}
          className={classes.selectFields}
          value={formData.engineType}
          label={addEditCarData.fields.engineType.label}
          required
          error={requireError.engineType}
          helperText={
            requireError.engineType ? addEditCarData.requiredFieldText : ""
          }
          onChange={handleChange}
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
        <SelectComponent
          menuItem={addEditCarData.fields.transmission.menu}
          name={"transmission"}
          className={classes.selectFields}
          value={formData.transmission}
          label={addEditCarData.fields.transmission.label}
          required
          error={requireError.transmission}
          helperText={
            requireError.transmission ? addEditCarData.requiredFieldText : ""
          }
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <SelectComponent
          menuItem={addEditCarData.fields.assembly.menu}
          name={"assembly"}
          className={classes.selectFields}
          value={formData.assembly}
          label={addEditCarData.fields.assembly.label}
          required
          error={requireError.assembly}
          helperText={
            requireError.assembly ? addEditCarData.requiredFieldText : ""
          }
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <SelectComponent
          menuItem={addEditCarData.fields.bodyType.menu}
          name={"bodyType"}
          className={classes.selectFields}
          value={formData.bodyType}
          label={addEditCarData.fields.bodyType.label}
          required
          error={requireError.bodyType}
          helperText={
            requireError.bodyType ? addEditCarData.requiredFieldText : ""
          }
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <SelectComponent
          menuItem={addEditCarData.fields.bodyCondition.menu}
          name={"bodyCondition"}
          className={classes.selectFields}
          value={formData.bodyCondition}
          label={addEditCarData.fields.bodyCondition.label}
          required
          error={requireError.bodyCondition}
          helperText={
            requireError.bodyCondition ? addEditCarData.requiredFieldText : ""
          }
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <SelectComponent
          menuItem={addEditCarData.fields.sellerType.menu}
          name={"sellerType"}
          className={classes.selectFields}
          value={formData.sellerType}
          label={addEditCarData.fields.sellerType.label}
          required
          error={requireError.sellerType}
          helperText={
            requireError.sellerType ? addEditCarData.requiredFieldText : ""
          }
          onChange={handleChange}
        />
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          <Typography variant="body1" className={classes.checkBoxLabel}>
            Features
          </Typography>
        </Grid>
        {addEditCarData.features.map((feature: string, index: number) => (
          <Grid item xs={12} sm={6} md={4} style={{ display: "flex" }} key={'cai-features'+index}>
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
