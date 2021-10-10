import { CircularProgress, Backdrop } from '@mui/material';

export default function Loading({ carregando }) {
    return (
        <Backdrop open={carregando}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}