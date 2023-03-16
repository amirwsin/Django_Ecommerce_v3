import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Alert} from "@mui/material";
import {useContext} from "react";
import {AlertContext} from "../AlertContext";


const MySnackBar = () => {

    const {alertState, setAlertState} = useContext(AlertContext)

    const handleClose = () => {
        setAlertState({...alertState, "open":false})
    }

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </>
    )

    return (
        <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            open={alertState?.open}
            autoHideDuration={10000}
            onClose={handleClose}
            action={action}
        >
            <Alert onClose={handleClose} severity={alertState?.color} sx={{width: '100%'}}>
                {alertState?.msg}
            </Alert>
        </Snackbar>
    )
}

export default MySnackBar