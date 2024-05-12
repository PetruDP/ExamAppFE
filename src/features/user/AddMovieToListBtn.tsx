import { useEffect, useState } from "react";
import {
    Button,
    Tooltip,
    ButtonProps,
} from "@mui/material";
import { useFetchWrapper } from "../../api/useFetchWrapper";
import { POSTAddMovie, StatusData } from "../../api/api";
import SnackResponse from "../../components/Utils/SnackResponse";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

type Props = {
    btnProps?: ButtonProps;
    id: string;
};

export default function AddMovieToListBtn({ btnProps, id }: Props) {
    const { loading, error, data, trigger } = useFetchWrapper<StatusData>();

    function handleAddMovie() {
        trigger(() => POSTAddMovie({ id }));
    }

    return (
        <>
            <Tooltip title="Add movie to your profile list">
                <Button
                    {...btnProps}
                    onClick={handleAddMovie}
                    sx={{ margin: "1.5rem 0 0 0" }}
                    variant="outlined"
                    disabled={loading}
                    startIcon={<AddCircleOutlineIcon />}
                >
                    {loading ? "Loading" : "Add"}
                </Button>
            </Tooltip>
            <SnackResponse 
                open={Boolean(data?.ok)}
                message="Movie added succesfully!"
            />
            <SnackResponse 
                open={Boolean(error)}
                message={error}
                alertProps={{
                    severity: "error"
                }}
            />
        </>
    );
}
