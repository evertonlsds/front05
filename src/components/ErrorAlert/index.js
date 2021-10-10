import { Snackbar, Alert } from '@mui/material';

export default function ErrorAlert({ openErrorAlert, setOpenErrorAlert, error }) {

    function handleAlertClose() {
        setOpenErrorAlert(!openErrorAlert);
    }

    return (
        <Snackbar open={openErrorAlert}
            autoHideDuration={5000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleAlertClose}
                severity="error"
                variant="filled">
                {error}
            </Alert>
        </Snackbar>
    )
}