import s from "../../styles/Profile.module.scss";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectJWTDecoded } from "../auth/authSlice";
import { useFetchWrapper } from "../../api/useFetchWrapper";
import { POSTUserUpdateUser, StatusData } from "../../api/api";
import PasswordInputWithRegex from "../../components/Utils/PasswordInputWithRegex";
import UsernameInputWithRegex from "../../components/Utils/UsernameInputWithRegex";
import { Button } from "@mui/material";
import { PASSWORD_REGEX, USERNAME_REGEX } from "../../types/constants";
import SnackResponse from "../../components/Utils/SnackResponse";

type Props = {
    tabValue: number;
    tabIndex: number;
};

export default function ProfileContent({ tabValue, tabIndex }: Props) {
    const { Username } = useAppSelector(selectJWTDecoded);
    const [oldPass, setOldPass] = useState("");
    const [pass, setPass] = useState("");
    const [user, setUser] = useState("");
    const {
        loading: l1,
        error: e1,
        data: d1,
        trigger: t1,
    } = useFetchWrapper<StatusData>();
    const {
        loading: l2,
        error: e2,
        data: d2,
        trigger: t2,
    } = useFetchWrapper<StatusData>();

    function handleUpdateUsername(){
        t1(() => POSTUserUpdateUser({ 
            username: user
        }));
    }

    function handleUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        t2(() => POSTUserUpdateUser({
            oldPassword: oldPass,
            newPassword: pass
        }));
    }

    return (
        <div
            className={s.ProfileContent}
            hidden={tabValue !== tabIndex}
        >
            {tabValue === tabIndex && (
                <div>
                    <div className={s.username}>
                        <form>
                            <h2>Change Username</h2>
                            <p>Current Username: {Username}</p>
                            <UsernameInputWithRegex
                                muiProps={{
                                    label: "New Username",
                                }}
                                username={user}
                                onChange={(e) => setUser(e.target.value)}
                            />
                            <Button
                                onClick={handleUpdateUsername}
                                disabled={!USERNAME_REGEX.test(user) || l1}
                            >
                                {l1 ? "LOADING" : "CHANGE"}
                            </Button>
                            <SnackResponse 
                                open={Boolean(d1?.ok)}
                                message={"Username updated!"}
                            />
                            <SnackResponse 
                                open={Boolean(e1)}
                                message={e1}
                                alertProps={{ 
                                    severity: "error"
                                }}
                            />
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
                            <Button
                                type="submit"
                                disabled={!PASSWORD_REGEX.test(pass) || l2}
                            >
                                {l2 ? "LOADING" : "CHANGE"}
                            </Button>
                            <SnackResponse 
                                open={Boolean(d2?.ok)}
                                message={"Password updated!"}
                            />
                            <SnackResponse 
                                open={Boolean(e2)}
                                message={e2}
                                alertProps={{ 
                                    severity: "error"
                                }}
                            />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
