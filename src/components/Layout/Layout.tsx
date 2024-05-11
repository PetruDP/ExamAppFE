import s from "../../styles/Layout.module.scss";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className={s["app-container"]}>
            <Header />
            <main className={s["app-main"]}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
