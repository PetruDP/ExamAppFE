import s from "../../styles/_404.module.scss";
import { NavLink } from "react-router-dom";

export default function _404() {
    return (
        <div className={s["_404-container"]}>
            <h1>404 - Page Not Found</h1>
            <p>
                Please navigate back to&nbsp;
                <NavLink to="/">home</NavLink>
            </p>
        </div>
    );
}
