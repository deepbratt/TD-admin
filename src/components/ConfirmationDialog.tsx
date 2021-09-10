import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from "@material-ui/core"
import React from "react";

interface DialogComponentProps {
    title: string
    message:string
    open: boolean
    handleConfirmation: ()=>void
    handleRejection: ()=>void
    confirmBtnLabel?: string
    rejectBtnLabel?: string 
}
const ConfirmationDialog = ({title, message, handleConfirmation, handleRejection, open, confirmBtnLabel="Agree", rejectBtnLabel="Disagree"} : DialogComponentProps)=>{
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const reject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      e.stopPropagation()
      handleRejection()
    }
    const confirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      e.stopPropagation()
      handleConfirmation()
    }
    return(
        <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleRejection}
        aria-labelledby="responsive-dialog-title"
        maxWidth={"sm"}
        fullWidth={true}
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={(e)=>reject(e)} color="secondary" variant="outlined">
            {rejectBtnLabel}
          </Button>
          <Button onClick={(e)=>confirm(e)} color="primary" autoFocus variant="contained">
            {confirmBtnLabel}
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default ConfirmationDialog