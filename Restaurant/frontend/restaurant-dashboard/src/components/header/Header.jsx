import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutApi } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slice/auth/authSlice';
import { useState, useEffect } from 'react';


export default function Header({ setAuthPopup }) {
    const isAuthenticated = useSelector(state => state.auth.status);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loggingOut, setLoggingOut] = useState(false);

    const onLogout = async () => {
        if (loggingOut) return; 
        try {
            setLoggingOut(true);

            const response = await logoutApi();

            if (response) {
            dispatch(logout());
            navigate('/');
            }
        } catch (err) {
            console.error('Logout failed', err);
        } finally {
            setLoggingOut(false);
        }
    };

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);

    
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
    const navItems = [
        {
        name: isAuthenticated ? 'Your Restaurant' : 'Home',
        to: '/',
        active: true
        },
        {   
            name: 'About',
            to: '/about',
            active: !isAuthenticated
        },
        {
            name: 'Contact Us',
            to: '/contact',
            active: !isAuthenticated
        },
        {
            name:"menu",
            to:'/menu',
            active: isAuthenticated
        },
        {   
            name: "Order's",
            to: '/order',
            active: isAuthenticated
        }
        
    ]
    const loginLogoutItems = [
        {
            name: 'Login',
            active: !isAuthenticated
        },
        {
            name: 'Get Started',
            active: !isAuthenticated
        },
        {
            name: 'logout',
            active: isAuthenticated
        }
    ] 
    return (
        <header className={`sticky z-50 top-0 ${scrolled
          ? "bg-white/0 shadow-md backdrop-blur-md"
          : "bg-transparent backdrop-blur-sm"} transition-all duration-300`}>
            <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="logo.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        {loginLogoutItems.map((item)=>(
                            item.active ? (
                                item.name === 'logout'?(
                                    <button
                                        key={item.name}
                                        onClick={onLogout}
                                        disabled={loggingOut}
                                        className={`text-gray-800 focus:ring-4 focus:ring-gray-300 
                                            font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 
                                            focus:outline-none 
                                            ${loggingOut
                                            ? 'opacity-60 cursor-not-allowed'
                                            : 'hover:bg-gray-50'
                                            }`}
                                        >
                                        {loggingOut ? 'Logging out...' : 'Logout'}
                                    </button>

                                ):(
                                <button
                                    key={item.name}
                                    onClick={() =>
                                        setAuthPopup({
                                        open: true,
                                        type: item.name === 'Login' ? 'login' : 'signup',
                                        })
                                    }
                                    className={
                                        item.name === 'Get Started'
                                        ? "text-white bg-[#FF342C] hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                        : "text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                    }
                                    >
                                    {item.name}
                                </button>

                            )
                            ) : null
                        ))}
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {
                                navItems.map((item)=>(
                                    item.active ? (
                                        <li key={item.name}>
                                            <NavLink 
                                                to={item.to}
                                                className={({isActive}) =>
                                                    `${isActive?"text-[#FF342E]":"text-gray-700"} block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-[#FF342E] lg:p-0`}
                                            >
                                                {item.name}
                                            </NavLink>
                                        </li>
                                ):null))
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
