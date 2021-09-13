import { Grid, Typography } from "@material-ui/core";
import { Colors } from "../../theme/themeConstants";
import { NOT_AVAILABLE } from "../../utils/constants/language/en/text";

interface KeyValueMapProps {
    heading?:string
    keyValueArray : Array<{name:string, value:string}>
}

const KeyValueMap = ({heading, keyValueArray=[]}:KeyValueMapProps) => {
  return (
    <Grid container spacing={1} style={{ backgroundColor: Colors.background }}>
      {heading && <Grid item xs={12}>
        <Typography variant="h4">{heading}</Typography>
      </Grid>}
      {keyValueArray.map((item: {name:string, value:string}, index: number)=>(
        <Grid
        item
        xs={12}
        style={{ display: "flex", justifyContent: "space-between" }}
        key={"key-value-map-item-"+index}
      >
        <Typography variant="body2">{item.name}</Typography>
        <Typography variant="body2">
          {item.value ? item.value : NOT_AVAILABLE}
        </Typography>
      </Grid>
      ))}
    </Grid>
  );
};

export default KeyValueMap;
