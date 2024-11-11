import {FC} from "react";
import {useAuth} from "../hooks/useAuth.ts";
import Auth from "../pages/auth.tsx";

interface Props {
    children: JSX.Element;
}

const ProtectedRoute : FC<Props> = ({ children }) => {

    const isAuth = useAuth()

    return <>
        {
            isAuth ? children : <Auth/>
        }
    </>
}

export default ProtectedRoute;