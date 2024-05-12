import { useEffect, useState } from "react";
import { Snackbar, Alert, AlertProps, SnackbarProps } from "@mui/material";

type Props = {
    open: boolean;
    message: string;
    alertProps?: AlertProps;
    snackbarProps?: SnackbarProps;
};

export default function SnackResponse({ open, message, alertProps, snackbarProps }: Props) {
    const [openSnack, setOpenSnack] = useState(false);

    useEffect(() => {
        if(open) setOpenSnack(true);
    }, [open]);

    function handleCloseSnackbar(){
        setOpenSnack(false);
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={openSnack}
            autoHideDuration={5000}
            onClose={handleCloseSnackbar}
            {...snackbarProps}
        >
            <Alert
                onClose={handleCloseSnackbar}
                severity="success"
                variant="filled"
                {...alertProps}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
