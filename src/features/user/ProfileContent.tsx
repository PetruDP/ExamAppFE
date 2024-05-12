import s from "../../styles/Profile.module.scss";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectJWTDecoded } from "../auth/authSlice";
import PasswordInputWithRegex from "../../components/Utils/PasswordInputWithRegex";
import UsernameInputWithRegex from "../../components/Utils/UsernameInputWithRegex";
import { Button } from "@mui/material";

type Props = {
    tabValue: number;
    tabIndex: number;
};

export default function ProfileContent({ tabValue, tabIndex }: Props) {
    const { Username } = useAppSelector(selectJWTDecoded);
    const [oldPass, setOldPass] = useState("");
    const [pass, setPass] = useState("");
    const [user, setUser] = useState("");

    function handleUpdateUsername(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
    }

    function handleUpdatePassword(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
    }

    return (
        <div
            className={s.ProfileContent}
            hidden={tabValue !== tabIndex}
        >
            {tabValue === tabIndex && (
                <div>
                    <div className={s.username}>
                        <form onSubmit={handleUpdateUsername}>
                            <h2>Change Username</h2>
                            <p>Current Username: {Username}</p>
                            <UsernameInputWithRegex
                                muiProps={{
                                    label: "New Username",
                                }}
                                username={user}
                                onChange={(e) => setUser(e.target.value)}
                            />
                            <Button type="submit">Change</Button>
                        </form>
                    </div>
                    <div className={s.password}>
                        <form onSubmit={handleUpdatePassword}>
                            <h2>Change Password</h2>
                            <PasswordInputWithRegex
                                muiProps={{ label: "Current Password" }}
                                password={oldPass}
                                onChange={(e) => setOldPass(e.target.value)}
                            />
                            <PasswordInputWithRegex
                                muiProps={{ label: "New Password" }}
                                password={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                            <Button type="submit">Change</Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
