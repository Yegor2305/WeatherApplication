import {createBrowserRouter} from "react-router-dom";
import Template from "../pages/template.tsx";
import Error from "../pages/error.tsx";
import Home from "../pages/home.tsx";
import Favorites from "../pages/favorites.tsx";
import Auth from "../pages/auth.tsx";
import ProtectedRoute from "../components/protectedRoute.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Template/>,
        errorElement: <Error/>,
        children: [
            {
                index: true,
                element: <ProtectedRoute>
                    <Home/>
                </ProtectedRoute>,
            },
            {
                path: 'favorites',
                element: <ProtectedRoute>
                    <Favorites/>
                </ProtectedRoute>,
            },
            {
                path: 'auth',
                element: <Auth/>,
            }
        ],
    }
]);