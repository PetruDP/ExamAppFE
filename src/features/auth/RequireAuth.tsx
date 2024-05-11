import type { Roles } from "../../types/types";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { selectToken, selectJWTDecoded } from "./authSlice";
import { useAppSelector } from "../../app/hooks";

type Props = {
    roles: Roles[];
};

export default function RequireAuth({ roles }: Props) {
    const location = useLocation();
    const token = useAppSelector(selectToken);
    const { Role } = useAppSelector(selectJWTDecoded);
    const grantAccess = token && Role && roles.includes(Role);
    
    const content = grantAccess ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
    return content;
}
