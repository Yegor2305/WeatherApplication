import {FC} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {FaSignOutAlt} from "react-icons/fa";
import {useAuth} from "../hooks/useAuth.ts";
import {useAppDispatch} from "../store/hooks.ts";
import {logout} from "../store/userSlice.ts";
import {removeTokenFromLocalStorage} from "../services/localStorageManager.ts";

const Header : FC = () => {
    const isAuth = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage()
        navigate('/');
    }

    return <header>
        <Link to='/' className='y-center'>
            <div className='icon'></div>
        </ Link>
        {
            isAuth && (
                <nav className='to-right pad-x-20'>
                    <ul className='navigation'>
                        <li className='navigation-item'>
                            <NavLink to='/'
                            className={({isActive}) => isActive ? 'text-navigation-active' : 'text-navigation-common'}>Home</NavLink>
                        </li>
                        <li className='navigation-item'>
                            <NavLink to='favorites'
                            className={({isActive}) => isActive ? 'text-navigation-active' : 'text-navigation-common'}>Favorites</NavLink>
                        </li>
                    </ul>
                </nav>
            )
        }
        {
            isAuth ? (
                <button className='btn y-center' onClick={logoutHandler}>
                    <span>Log out</span>
                    <FaSignOutAlt/>
                </button>
            ) : (
                <Link className='to-right a-default text-navigation-common' to='auth'>
                    Log in | Sign Up
                </Link>
            )

        }
    </header>
}

export default Header;