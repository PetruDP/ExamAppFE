import s from "../../styles/Register.module.scss";
import { useEffect, useState } from "react";
import { useFetchWrapper } from "../../api/useFetchWrapper";
import { POSTRegister, Login_Register_Payload } from "../../api/api";
import { Paper, TextField, Button, LinearProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { USERNAME_REGEX, PASSWORD_REGEX, ONE_DIGIT, ONE_LOWERCASE, ONE_SPECIAL, ONE_UPPERCASE, AT_LEAST_8_32 } from "../../types/constants";
import PasswordInput from "../../components/Utils/PasswordInput";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState<Login_Register_Payload>({
        username: "",
        password: "",
    });
    const { loading, error, data, trigger } = useFetchWrapper<{
        status: number;
        ok: boolean;
    }>();

    // Effects:
    useEffect(() => {
        if (data?.ok) navigate("/");
    }, [data, navigate]);

    // Handlers:
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        trigger(() => POSTRegister(form));
    }

    // Template:
    const errorTemplate = error && (
        <p
            style={{
                color: "red",
                textAlign: "center",
                margin: "0.75rem 0 0 0",
            }}
        >
            {error}
        </p>
    );
    const loadingTemplate = loading && <LinearProgress />;

    return (
        <div className={s.register}>
            <Paper
                elevation={4}
                className={s.paper}
            >
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <TextField
                        label="Username"
                        size="small"
                        required
                        margin="normal"
                        error={
                            form.username.length > 0 &&
                            !USERNAME_REGEX.test(form.username)
                        }
                        helperText={
                            form.username.length > 0 &&
                            !USERNAME_REGEX.test(form.username) && (
                                <span className={s["helperText"]}>
                                    <span>Username must:</span>
                                    <span>
                                        Contain characters: a-Z or spaces
                                    </span>
                                    <span>Have 2 minimum length</span>
                                </span>
                            )
                        }
                        value={form.username}
                        onChange={(e) =>
                            setForm((p) => ({ ...p, username: e.target.value }))
                        }
                    />
                    <PasswordInput
                        label="Password"
                        size="small"
                        required
                        margin="normal"
                        error={
                            form.password.length > 0 &&
                            !PASSWORD_REGEX.test(form.password)
                        }
                        helperText={
                            form.password.length > 0 &&
                            !PASSWORD_REGEX.test(form.password) && (
                                <span className={s["helperText"]}>
                                    <span>Password must contain:</span>
                                    <span className={ONE_DIGIT.test(form.password) ? s["ok"] : ""}>1 digit</span>
                                    <span className={ONE_UPPERCASE.test(form.password) ? s["ok"] : ""}>1 uppercase character</span>
                                    <span className={ONE_LOWERCASE.test(form.password) ? s["ok"] : ""}>1 lowercase character</span>
                                    <span className={ONE_SPECIAL.test(form.password) ? s["ok"] : ""}>1 special [#?!@$ %^&*-]</span>
                                    <span className={AT_LEAST_8_32.test(form.password) ? s["ok"] : ""}>At least 8 characters long</span>
                                </span>
                            )
                        }
                        value={form.password}
                        onChange={(e) =>
                            setForm((p) => ({ ...p, password: e.target.value }))
                        }
                    />
                    <p>
                        Already own an account?{" "}
                        <Link to="/login">Login here</Link>
                    </p>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!form.username || !form.password}
                    >
                        Register
                    </Button>
                    {errorTemplate}
                </form>
                {loadingTemplate}
            </Paper>
        </div>
    );
}
