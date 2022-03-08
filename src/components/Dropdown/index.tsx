import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import LayoutStyle from './styles';

export interface DropdownProps {
  options: { value: string; label: string }[];
}

const Dropdown: React.FC<DropdownProps | any> = (props) => {
  const {
    value,
    fullWidth,
    name,
    variant,
    size,
    error = null,
    onChange,
    options
  } = props;
  const { root, input } = LayoutStyle();
  return (
    <TextField
      select
      className={root}
      name={name}
      value={value}
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      InputProps={{
        classes: { input: input }
      }}
      InputLabelProps={{
        shrink: !value ? false : true
      }}
      {...props}
    >
      {options.map((option: any) => (
        <MenuItem key={option.value} value={option.value}>
          {`${option.label}`}
        </MenuItem>
      ))}
    </TextField>
  );
};

Dropdown.defaultProps = {
  size: 'small',
  fullWidth: true,
  variant: 'outlined'
};

export default Dropdown;
