import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, useMediaQuery, useTheme } from "@material-ui/core"
import React, { useState } from "react";

interface InputDialogProps {
    title: string
    value:string
    open: boolean
    helperText: string
    label: string
    handleConfirmation: ()=>void
    handleRejection: ()=>void
    handleChange: (e:any)=>void
    confirmBtnLabel?: string
    rejectBtnLabel?: string 
}
const InputDialog = ({title, value, handleConfirmation, handleRejection,helperText="This field is required", open, confirmBtnLabel="Submit", rejectBtnLabel="Cancel", handleChange, label} : InputDialogProps)=>{
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [error, setError] = useState(false)

    const reject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      e.stopPropagation()
      setError(false)
      handleRejection()
    }
    const confirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      e.stopPropagation()
      if(value===""){
          setError(true)
          return
      }
      setError(false)
      handleConfirmation()
    }
    return(
        <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={reject}
        aria-labelledby="responsive-dialog-title"
        maxWidth={"sm"}
        fullWidth={true}
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <TextField
          fullWidth
          value={value}
          label={label}
          required
          error={error}
          helperText={
            error ? helperText : ""
          }
          onChange={handleChange}
        />
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

export default InputDialog