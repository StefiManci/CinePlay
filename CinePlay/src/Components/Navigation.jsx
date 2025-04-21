import { NavLink, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navigation() {
    const { user, isAuthenticated } = useAuth0();

    const navLinkClass = ({ isActive }) =>
        isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 transition-all"
            : "text-gray-800 hover:text-blue-600 transition-all";

    return (
        <>
            {/* Navigation Bar */}
            <div
                className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 transition-opacity duration-500 ease-in-out"
                style={{ opacity: "1", visibility: "visible" }}
            >
                <div className="flex w-full h-16 justify-between items-center px-6 py-3">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-blue-600">CinePlay</div>

                    {/* Navigation Links */}
                    <div className="flex space-x-6 items-center">
                        <NavLink to="/" className={navLinkClass}>
                            HOME
                        </NavLink>
                        <NavLink to="/Movies" className={navLinkClass}>
                            MOVIES
                        </NavLink>
                        <NavLink to="/Series" className={navLinkClass}>
                            SERIES
                        </NavLink>
                        <NavLink to="/Search" className={navLinkClass}>
                            SEARCH
                        </NavLink>
                        <NavLink to="/Profile" className={navLinkClass}>
                            PROFILE
                        </NavLink>
                    </div>

                    {/* User Info / Guest */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-2">
                                <img
                                    src={user.picture}
                                    alt="User"
                                    className="w-10 h-10 rounded-full"
                                />
                                <span className="text-lg text-gray-800">{user.nickname}</span>
                            </div>
                        ) : (
                            <div className="text-lg text-gray-800">Guest</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="pt-20">
                <Outlet />
            </div>
        </>
    );
}
