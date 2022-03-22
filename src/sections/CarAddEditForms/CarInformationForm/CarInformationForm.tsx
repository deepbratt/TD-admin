import {
  createStyles,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { City } from "country-state-city";
import addEditCarData from "../../../utils/constants/language/en/addEditCarData";
import SelectInputComponent from "../../../components/SelectInputComponent";
import { NO_REGISTRATION_DISPLAY } from "../../../utils/constants/language/en/text";
import useCarInformationForm from "./useCarInformationForm";

interface CarInformationFormProps {
  formData: {
    adType: '',
    rentType: '',
    rentalCharge: '',
    city: "";
    carModel: "";
    carMake: "";
    modelYear: "";
    bodyColor: "";
    registeredIn: "";
    mileage: "";
    price: "";
    registrationNo: "";
    description: "";
    modelVersion: "";
    associatedPhone: "";
  };
  handleChange: (event: any) => void;
  requireError: any;
  handleChangeSelect: any;
  setFormData: React.Dispatch<any>;
  adType: string;
  handleChangeAdType: (name: string, value: any) => void;
  bodyColorArray: any[];
}

const CarInformationForm = ({
  formData,
  handleChange,
  requireError,
  handleChangeSelect,
  setFormData,
  adType,
  handleChangeAdType,
  bodyColorArray,
}: CarInformationFormProps) => {
  const classes = useStyles();
  const {
    carMakesList,
    carModelsList,
    carVersionsList,
    handleTextChange,
    handlePhoneInputChange,
  } = useCarInformationForm(formData, setFormData);

  const cities = City.getCitiesOfCountry("PK");
  const extractedCityNames = cities?.map((item) => item.name);
  let cityNames = [];
  if (extractedCityNames) {
    cityNames.push(...extractedCityNames);
  }

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={6}>
        <SelectInputComponent
          dataArray={cityNames}
          name={"city"}
          className={classes.selectFields}
          value={
            formData.city !== null ? toTitleCase(formData.city) : formData.city
          }
          label={addEditCarData.fields.selectCity.label}
          required
          error={requireError.city}
          helperText={requireError.city ? addEditCarData.requiredFieldText : ""}
          handleChangeSelect={handleChangeSelect}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <SelectInputComponent
          dataArray={
            carMakesList.length < 1 ? [formData.carMake] : carMakesList
          }
          name={"carMake"}
          className={classes.selectFields}
          value={formData.carMake}
          label={addEditCarData.fields.carMake.label}
          required
          error={requireError.carMake}
          helperText={
            requireError.carMake ? addEditCarData.requiredFieldText : ""
          }
          handleChangeSelect={handleChangeSelect}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <SelectInputComponent
          dataArray={cityNames}
          name={"registeredIn"}
          className={classes.selectFields}
          value={formData.registeredIn}
          label={addEditCarData.fields.registeredIn.label}
          required
          error={requireError.registeredIn}
          helperText={
            requireError.registeredIn ? addEditCarData.requiredFieldText : ""
          }
          handleChangeSelect={handleChangeSelect}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <SelectInputComponent
          dataArray={
            carModelsList.length < 1 ? [formData.carModel] : carModelsList
          }
          name={"carModel"}
          disabled={formData.carMake === ""}
          className={classes.selectFields}
          value={formData.carModel}
          label={addEditCarData.fields.carModel.label}
          required
          error={requireError.carModel}
          helperText={
            requireError.carModel ? addEditCarData.requiredFieldText : ""
          }
          handleChangeSelect={handleChangeSelect}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <SelectInputComponent
          dataArray={addEditCarData.fields.modelYear.menu}
          name={"modelYear"}
          className={classes.selectFields}
          value={formData.modelYear}
          label={addEditCarData.fields.modelYear.label}
          required
          error={requireError.modelYear}
          helperText={
            requireError.modelYear ? addEditCarData.requiredFieldText : ""
          }
          handleChangeSelect={handleChangeSelect}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <SelectInputComponent
          dataArray={
            carVersionsList.length < 1
              ? [formData.modelVersion]
              : carVersionsList
          }
          name={"modelVersion"}
          disabled={carVersionsList.length < 1 ? true : false}
          className={classes.selectFields}
          value={formData.modelVersion}
          label={addEditCarData.fields.carVersion.label}
          // required
          // error={requireError.carModel}
          // helperText={
          //   requireError.carModel ? addEditCarData.requiredFieldText : ""
          // }
          handleChangeSelect={handleChangeSelect}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <SelectInputComponent
          dataArray={bodyColorArray}
          name={"bodyColor"}
          className={classes.selectFields}
          value={formData.bodyColor}
          label={addEditCarData.fields.bodyColor.label}
          required
          error={requireError.bodyColor}
          helperText={
            requireError.bodyColor ? addEditCarData.requiredFieldText : ""
          }
          handleChangeSelect={handleChangeSelect}
        />
        {/* <SelectComponent
        menuItem={bodyColorArray}
        name={"bodyColor"}
        className={classes.selectFields}
        value={formData.bodyColor}
        label={addEditCarData.fields.bodyColor.label}
        required
        error={requireError.bodyColor}
        helperText={
          requireError.bodyColor ? addEditCarData.requiredFieldText : ""
        }
        onChange={handleChange}
      /> */}
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          type="number"
          name={"mileage"}
          className={classes.selectFields}
          value={formData.mileage}
          // value={textValue.mileage}
          label={addEditCarData.fields.mileage.label}
          required
          error={requireError.mileage}
          helperText={
            requireError.mileage ? addEditCarData.requiredFieldText : ""
          }
          // onChange={handleChange}
          onChange={handleTextChange}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          name={"registrationNo"}
          type="text"
          className={classes.selectFields}
          value={formData.registrationNo}
          label={addEditCarData.fields.registrationNo.label}
          required
          error={requireError.registrationNo}
          helperText={
            requireError.registrationNo ? addEditCarData.requiredFieldText : ""
          }
          // onChange={handleChange}
          onChange={handleTextChange}
        />
      </Grid>
      {/* Ad Type Section and Conditional Rendering */}
      <Grid item xs={12} sm={12} md={6}>
        <SelectInputComponent
          name={"adType"}
          dataArray={addEditCarData.fields.adType.menu}
          className={classes.selectFields}
          value={formData.adType}
          label={addEditCarData.fields.adType.label}
          required
          error={requireError.adType}
          helperText={
            requireError.adType ? addEditCarData.requiredFieldText : ""
          }
          handleChangeSelect={handleChangeAdType}
        />
      </Grid>

      {adType === "Sell" && (
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            name={"price"}
            type="number"
            className={classes.selectFields}
            value={formData.price}
            label={addEditCarData.fields.price.label}
            required
            // error={adType === 'Sell' && requireError.price}
            // helperText={
            //   adType === 'Sell' && requireError.price ? addEditCarData.requiredFieldText : ''
            // }
            onChange={handleTextChange}
          />
        </Grid>
      )}

      {adType === "Rental" && (
        <>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name={"rentalCharge"}
              type="number"
              className={classes.selectFields}
              value={formData.rentalCharge}
              label={addEditCarData.fields.rentalCharge.label}
              required
              // error={adType === 'Rental' && requireError.rentalCharge}
              // helperText={
              //   adType === 'Rental' && requireError.rentalCharge ? addEditCarData.requiredFieldText : ''
              // }
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SelectInputComponent
              name={"rentType"}
              dataArray={addEditCarData.fields.rentType.menu}
              className={classes.selectFields}
              value={formData.rentType}
              label={addEditCarData.fields.rentType.label}
              required
              // error={requireError.rentType}
              // helperText={
              //   requireError.rentType ? addEditCarData.requiredFieldText : ''
              // }
              handleChangeSelect={handleChangeSelect}
            />
          </Grid>
        </>
      )}
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" color="primary">
          {NO_REGISTRATION_DISPLAY}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          name="associatedPhone"
          onChange={handlePhoneInputChange}
          value={formData.associatedPhone}
          fullWidth
          type="text"
          label={addEditCarData.fields.associatedPhone.label}
          required
          error={requireError.associatedPhone}
          helperText={
            requireError.associatedPhone && formData.associatedPhone
              ? addEditCarData.invalidPhoneField
              : requireError.associatedPhone
              ? addEditCarData.requiredFieldText
              : ""
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+92</InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="standard-multiline-static"
          label={addEditCarData.fields.description.label}
          multiline
          name="description"
          required
          rows={4}
          placeholder={addEditCarData.fields.description.defaultValue}
          style={{ width: "100%" }}
          value={formData.description}
          // onChange={handleChange}
          onChange={handleTextChange}
          error={requireError.registrationNo}
          helperText={
            requireError.registrationNo ? addEditCarData.requiredFieldText : ""
          }
        />
      </Grid>
    </Grid>
  );
};
export default CarInformationForm;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sterik: {
      color: "red",
    },
    selectFields: {
      width: "100%",
      "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
        {
          display: "none",
        },
    },
    inputLabel: {
      fontSize: "16px",
      color: "black",
    },
  })
);
