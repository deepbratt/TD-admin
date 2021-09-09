import { Paper } from "@material-ui/core"

interface SecondaryLayoutProps{
    children : React.ReactNode;
}
const SecondaryLayout = ({children}: SecondaryLayoutProps) =>{
    return (
        <Paper style={{margin:"10px", backgroundColor:"white", padding:"10px"}}>
            {children}
        </Paper>
    )
}

export default SecondaryLayout