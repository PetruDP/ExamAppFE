import s from "../../styles/Register.module.scss";
import PasswordInput from "./PasswordInput";
import {
    PASSWORD_REGEX,
    ONE_DIGIT,
    ONE_LOWERCASE,
    ONE_SPECIAL,
    ONE_UPPERCASE,
    AT_LEAST_8_32,
} from "../../types/constants";
import { TextFieldProps } from "@mui/material";
import React from "react";

type Props = {
    password: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    muiProps?: TextFieldProps;
};

export default function PasswordInputWithRegex({
    password,
    onChange,
    muiProps,
}: Props) {
    return (
        <PasswordInput
            label="Password"
            size="small"
            required
            margin="normal"
            error={password.length > 0 && !PASSWORD_REGEX.test(password)}
            helperText={
                password.length > 0 &&
                !PASSWORD_REGEX.test(password) && (
                    <span className={s["helperText"]}>
                        <span>Password must contain:</span>
                        <span
                            className={ONE_DIGIT.test(password) ? s["ok"] : ""}
                        >
                            1 digit
                        </span>
                        <span
                            className={
                                ONE_UPPERCASE.test(password) ? s["ok"] : ""
                            }
                        >
                            1 uppercase character
                        </span>
                        <span
                            className={
                                ONE_LOWERCASE.test(password) ? s["ok"] : ""
                            }
                        >
                            1 lowercase character
                        </span>
                        <span
                            className={
                                ONE_SPECIAL.test(password) ? s["ok"] : ""
                            }
                        >
                            1 special [#?!@$ %^&*-]
                        </span>
                        <span
                            className={
                                AT_LEAST_8_32.test(password) ? s["ok"] : ""
                            }
                        >
                            At least 8 characters long
                        </span>
                    </span>
                )
            }
            value={password}
            onChange={onChange}
            {...muiProps}
        />
    );
}
