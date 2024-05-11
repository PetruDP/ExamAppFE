import { useEffect, useState } from "react";
import {
    Button,
    Tooltip,
    ButtonProps,
    Snackbar,
    Alert,
} from "@mui/material";
import { useFetchWrapper } from "../../api/useFetchWrapper";
import { POSTAddMovie } from "../../api/api";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

type Props = {
    btnProps?: ButtonProps;
    id: string;
};

export default function AddMovieToListBtn({ btnProps, id }: Props) {
    const [snack, setSnack] = useState({
        success: false,
        error: false
    });
    const { error, data, trigger } = useFetchWrapper<{
        status: number;
        ok: boolean;
    }>();

    useEffect(() => {
        if (data?.ok) setSnack((p) => ({ ...p, success: true }));
        if (error) setSnack((p) => ({ ...p, error: true }));
    }, [data, error]);

    function handleAddMovie() {
        trigger(() => POSTAddMovie({ id }));
    }

    function handleCloseSnackbar(type: keyof typeof snack) {
        setSnack((p) => ({ ...p, [type]: false }));
    }

    return (
        <>
            <Tooltip title="Add movie to your profile list">
                <Button
                    {...btnProps}
                    onClick={handleAddMovie}
                    sx={{ margin: "1.5rem 0 0 0" }}
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                >
                    Add
                </Button>
            </Tooltip>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snack.error}
                autoHideDuration={5000}
                onClose={() => handleCloseSnackbar("error")}
            >
                <Alert
                    onClose={() => handleCloseSnackbar("error")}
                    severity="error"
                    variant="filled"
                >
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snack.success}
                autoHideDuration={5000}
                onClose={() => handleCloseSnackbar("success")}
            >
                <Alert
                    onClose={() => handleCloseSnackbar("success")}
                    severity="success"
                    variant="filled"
                >
                    Movie added succesfully!
                </Alert>
            </Snackbar>
        </>
    );
}
