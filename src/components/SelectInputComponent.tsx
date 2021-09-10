import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

interface SelectInputProps {
  dataArray: Array<string>;
  required?: boolean;
  style?: any;
  className?: any;
  name: string;
  value: any;
  label?: string;
  error?: boolean;
  helperText?: string;
  handleChangeSelect: any
  // textInputProps : TextFieldProps
}

const SelectInputComponent = ({
  dataArray,
  required,
  style,
  className,
  name,
  value,
  label,
  error,
  helperText,
  handleChangeSelect
}: SelectInputProps) => {
  return (
    <Autocomplete
      value={value}
    //   onInputChange={(e: any, valueChanged: any) =>
    //     handleChangeSelect({name: name, value: valueChanged})
    // {"city": "islamabad"}
    //   }
    //   inputValue={value ? value : ""}
      onChange={(event: any, valueChanged: any) =>
        handleChangeSelect(name, valueChanged)
      }
      style={style}
      className={className}
      options={dataArray}
      autoHighlight
      getOptionLabel={(option: any) => option}
      renderOption={(option) => (
        <React.Fragment>
          <span>{option}</span>
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          name={name}
          value={value}
          error={error}
          helperText={helperText}
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "off", // disable autocomplete and autofill
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    />
  );
};

export default SelectInputComponent;
