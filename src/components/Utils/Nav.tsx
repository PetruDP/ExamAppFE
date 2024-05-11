import s from "../../styles/Header.module.scss";
import { useState } from "react";
import { Roles } from "../../types/constants";
import {
    selectToken,
    selectJWTDecoded,
    logout,
} from "../../features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import {
    Menu,
    MenuItem,
    Avatar,
    IconButton,
    ListItemIcon,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Nav() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectToken);
    const { Username, Role } = useAppSelector(selectJWTDecoded);
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);

    const handleSetAnchor = (e: React.MouseEvent<HTMLElement>) => {
        setAnchor(e.currentTarget);
    };
    const handleClose = () => {
        setAnchor(null);
    };

    const handleLogout = () => {
        setAnchor(null);
        dispatch(logout());
        navigate("/");
    };

    return (
        <nav>
            <IconButton
                onClick={handleSetAnchor}
                size="small"
            >
                <Avatar sx={{ width: 40, height: 40 }}>
                    {Username ? Username[0] : ""}
                </Avatar>
            </IconButton>

            <Menu
                className={s["nav-menu"]}
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={handleClose}
            >
                {(token && Role === Roles.admin) && (
                    <Link to="/admin">
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            Admin Dashboard
                        </MenuItem>
                    </Link>
                )}
                {token && (
                    <Link to="/profile">
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            Settings/Profile
                        </MenuItem>
                    </Link>
                )}
                <Link to="/login">
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        Login
                    </MenuItem>
                </Link>
                <Link to="/register">
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PersonAddAlt1Icon />
                        </ListItemIcon>
                        Register
                    </MenuItem>
                </Link>
                {token && (
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                )}
            </Menu>
        </nav>
    );
}
