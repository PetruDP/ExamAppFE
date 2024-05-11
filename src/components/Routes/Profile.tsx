import s from "../../styles/Profile.module.scss";
import { selectJWTDecoded } from "../../features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";

export default function Profile() {
    const { Role, Username } = useAppSelector(selectJWTDecoded);
    return (
        <div className={s["profile-container"]}>
            <h1>Profile</h1>
            <p>Role = {Role}</p>
            <p>Username = {Username}</p>
        </div>
    );
}
