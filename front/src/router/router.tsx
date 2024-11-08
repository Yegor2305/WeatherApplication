import {createBrowserRouter} from "react-router-dom";
import Template from "../pages/template.tsx";
import Error from "../pages/error.tsx";
import Home from "../pages/home.tsx";
import Favorites from "../pages/favorites.tsx";
import Auth from "../pages/auth.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Template/>,
        errorElement: <Error/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: 'favorites',
                element: <Favorites/>,
            },
            {
                path: 'auth',
                element: <Auth/>,
            }
        ],
    }
]);