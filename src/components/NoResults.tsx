import { Grid, Typography } from "@material-ui/core"

const NoResults = () =>{
    return (
        <Grid container style={{minHeight:"50px",width:"100%"}} justifyContent="center" alignItems="center">
            <Typography variant="h2">No Result Found</Typography>
        </Grid>
    )
}

export default NoResults