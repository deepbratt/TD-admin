import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LayoutStyle from "./styles";

export interface PasswordFieldProps {}

const PasswordField: React.FC<PasswordFieldProps | any> = (props) => {
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
  const [showPassword, setShowPassword] = useState(false);
  const { root, input } = LayoutStyle();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <TextField
      className={root}
      placeholder={placeholder}
      type={showPassword ? "text" : "password"}
      name={name}
      value={value}
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      InputProps={{
        classes: { input: input },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

PasswordField.defaultProps = {
  size: "small",
  fullWidth: true,
  variant: "outlined",
};

export default PasswordField;
