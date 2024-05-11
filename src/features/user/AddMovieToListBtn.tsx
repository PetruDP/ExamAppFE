import { useEffect, useState } from "react";
import { Button, Tooltip, ButtonProps, Snackbar, IconButton } from "@mui/material";
import { useFetchWrapper } from "../../api/useFetchWrapper";
import { POSTAddMovie } from "../../api/api";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    btnProps?: ButtonProps;
    id: string;
};

export default function AddMovieToListBtn({ btnProps, id }: Props) {
    const [successSnack, setSuccessSnack] = useState(false);
    const { error, data, trigger } = useFetchWrapper<{
        status: number;
        ok: boolean;
    }>();

    useEffect(() => {
        if(data?.ok) setSuccessSnack(true);
    }, [data]);

    function handleAddMovie() {
        trigger(() => POSTAddMovie({ id }));
    }

    function handleCloseSnackbar(){
        setSuccessSnack(false);
    }

    const action = (
        <>
            <Button
                color="secondary"
                size="small"
                onClick={handleCloseSnackbar}
            >
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackbar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

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
                open={Boolean(error)}
                message={error}
                autoHideDuration={5000}
            />
            <Snackbar 
                action={action}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={successSnack}
                message={"Movie added succesfully!"}
            />
        </>
    );
}
