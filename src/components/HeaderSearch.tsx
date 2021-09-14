import { IconButton, InputAdornment, makeStyles, TextField } from "@material-ui/core"
import { SearchOutlined } from "@material-ui/icons"
import { Colors } from "../theme/themeConstants"

interface HeaderSearchProps{
    setKeywords: (value: React.SetStateAction<string>) => void
    getResults: (pageValue?: number) => void
}

const HeaderSearch = ({setKeywords, getResults} : HeaderSearchProps) =>{
    const classes = HeaderSearchStyles()
    return(
        <TextField
            placeholder="Search"
            // value={keywords}
            onKeyDown={(e)=>{if(e.key === "Enter"){
              return getResults(1)
            }
            }}
            onChange={(e)=>setKeywords(e.target.value)}
            style={{ backgroundColor: Colors.background }}
            InputProps={{
              classes: {
                input: classes.inputStyles,
                adornedEnd:classes.adornedEndStyle
              },
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputStyles}
                >
                  <IconButton className={classes.inputStyles} onClick={()=>getResults(1)}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
    )

}

export default HeaderSearch

const HeaderSearchStyles = makeStyles(() => ({
    inputStyles: {
      padding: 5,
    },
    adornedEndStyle:{
        padding:"0"
    }
  }));