import s from "../../styles/Profile.module.scss";
import ProfileContent from "../../features/user/ProfileContent";

export default function Profile() {
    return (
        <div className={s["profile-container"]}>
            <h1>Profile</h1>
            <ProfileContent />
        </div>
    );
}
