import s from "../../styles/AdminDashboard.module.scss";
import UsersList from "../../features/admin/UsersList";

export default function AdminDashboard() {
    return (
        <div className={s.AdminDashboard}>
            <h1>Admin Dashboard</h1>
            <UsersList />
        </div>
    );
}
