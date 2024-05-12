import s from "../../styles/Login.module.scss";
import { useEffect, useState } from "react";
import { useFetchWrapper } from "../../api/useFetchWrapper";
import { POSTLogin, Login_Register_Payload } from "../../api/api";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setPersistLogin, selectPersistLogin } from "./authSlice";
import {
    Paper,
    TextField,
    Button,
    LinearProgress,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Utils/PasswordInput";

export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const persistLogin = useAppSelector(selectPersistLogin);
    const [form, setForm] = useState<Login_Register_Payload>({
        username: "",
        password: ""
    })
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
        trigger(() => POSTLogin(form));
    }

    function handlePersistLoginChange(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setPersistLogin(e.target.checked));
    }

    // Template:
    const errorTemplate = error && (
        <p style={{ color: "red", textAlign: "center", margin: "0.75rem 0 0 0" }}>{error}</p>
    );
    const loadingTemplate = loading && <LinearProgress />;

    return (
        <div className={s.login}>
            <Paper
                elevation={4}
                className={s.paper}
            >
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <TextField
                        label="Username"
                        size="small"
                        required
                        margin="normal"
                        value={form.username}
                        onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                    />
                    <PasswordInput
                        label="Password"
                        size="small"
                        required
                        margin="normal"
                        value={form.password}
                        onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                    />
                    <FormControlLabel
                        label="Remember me?"
                        control={
                            <Checkbox
                                size="small"
                                checked={persistLogin}
                                onChange={handlePersistLoginChange}
                            />
                        }
                    />
                    <p>
                        Not registered?{" "}
                        <Link to="/register">Create an account</Link>
                    </p>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!form.username || !form.password || loading}
                    >
                        Login
                    </Button>
                    {errorTemplate}
                </form>
                {loadingTemplate}
            </Paper>
        </div>
    );
}
