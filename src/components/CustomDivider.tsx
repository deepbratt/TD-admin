import { Divider, DividerProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const CustomDivider: React.FC<DividerProps> = ({...props}) => {
    const classes = useStyles()
  return (
    <Divider className={classes.defaultStyle} {...props} />
  );
};

const useStyles = makeStyles(()=>({
    defaultStyle : {
        backgroundColor:"grey",
        width: "100%",
        marginTop: 5,
        marginBottom:5
    }
}))

export default CustomDivider;
