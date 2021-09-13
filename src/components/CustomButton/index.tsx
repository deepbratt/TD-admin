import {
  Button as MuiButton,
  ButtonProps,
  Typography,
} from "@material-ui/core";

interface IButtonProps extends ButtonProps {
  fullWidth?: boolean;
  color?: any;
  variant?: any;
  radius?: string;
  styles?: string;
  size?: "small" | "medium" | "large";
  handleClick?: () => void;
}

function CustomButton({
  fullWidth,
  variant,
  radius,
  styles,
  color,
  handleClick,
  size,
  children,
  ...rest
}: IButtonProps) {
  return (
    <MuiButton
      onClick={handleClick}
      className={styles && styles}
      style={{ borderRadius: radius, boxShadow: "none" }}
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      {...rest}
    >
      <Typography variant="button">{children}</Typography>
    </MuiButton>
  );
}
CustomButton.defaultProps = {
  fullWidth: false,
  color: "primary",
  variant: "contained",
  radius: "7px",
};

export default CustomButton;
