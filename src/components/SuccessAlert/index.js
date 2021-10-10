import { Snackbar, Alert } from '@mui/material';

export default function SuccessAlert({ openSuccessAlert, setOpenSuccessAlert, message }) {

    function handleAlertClose() {
        setOpenSuccessAlert(!openSuccessAlert);
    }

    return (
        <Snackbar open={openSuccessAlert}
            autoHideDuration={8000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleAlertClose}
                severity="success"
                variant="filled">
                {message}
            </Alert>
        </Snackbar>
    )
}