import s from "../../styles/Header.module.scss";
import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Nav from "../Utils/Nav";

export default function Header() {
    return (
        <header className={s["app-header"]}>
            <div>
                <NavLink
                    to="/"
                    className={s["link"]}
                >
                    <IconButton size="medium">
                        <HomeIcon
                            fontSize="large"
                            className={s["icon"]}
                        />
                    </IconButton>
                </NavLink>
                <Nav />
            </div>
        </header>
    );
}
