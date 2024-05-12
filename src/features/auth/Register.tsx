import s from "../../styles/Register.module.scss";
import { useEffect, useState } from "react";
import { useFetchWrapper } from "../../api/useFetchWrapper";
import { POSTRegister, Login_Register_Payload } from "../../api/api";
import { Paper, Button, LinearProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PasswordInputWithRegex from "../../components/Utils/PasswordInputWithRegex";
import UsernameInputWithRegex from "../../components/Utils/UsernameInputWithRegex";

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
                    <UsernameInputWithRegex 
                        username={form.username}
                        onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                    />
                    <PasswordInputWithRegex 
                        password={form.password}
                        onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
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
