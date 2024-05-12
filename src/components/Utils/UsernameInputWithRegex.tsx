import s from "../../styles/Register.module.scss";
import { USERNAME_REGEX } from "../../types/constants";
import { TextField, TextFieldProps } from "@mui/material";

type Props = {
    username: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    muiProps?: TextFieldProps
};

export default function UsernameInputWithRegex({ username, onChange, muiProps }: Props) {
    return (
        <TextField
            label="Username"
            size="small"
            required
            margin="normal"
            error={username.length > 0 && !USERNAME_REGEX.test(username)}
            helperText={
                username.length > 0 &&
                !USERNAME_REGEX.test(username) && (
                    <span className={s["helperText"]}>
                        <span>Username must:</span>
                        <span>Contain characters: a-Z or spaces</span>
                        <span>Have 2 minimum length</span>
                    </span>
                )
            }
            value={username}
            onChange={onChange}
            {...muiProps}
        />
    );
}
