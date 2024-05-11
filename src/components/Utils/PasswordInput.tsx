import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type Props = TextFieldProps;

export default function PasswordInput(props: Props) {
    const [show, setShow] = useState(false);
    return (
        <TextField
            type={show ? "text" : "password"}
            {...props}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShow(!show)}>
                            { show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}
