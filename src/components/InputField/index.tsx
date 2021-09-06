import TextField from "@material-ui/core/TextField";
import LayoutStyle from "./styles";

export interface InputFieldProps {}

const InputField: React.FC<InputFieldProps | any> = (props) => {
  const {
    value,
    fullWidth,
    placeholder,
    name,
    variant,
    size,
    error = null,
    onChange,
  } = props;
  const { root, input } = LayoutStyle();
  return (
    <TextField
      className={root}
      placeholder={placeholder}
      name={name}
      value={value}
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      InputProps={{
        classes: { input: input },
      }}
      {...props}
    />
  );
};

InputField.defaultProps = {
  size: "small",
  fullWidth: true,
  variant: "outlined",
};

export default InputField;
