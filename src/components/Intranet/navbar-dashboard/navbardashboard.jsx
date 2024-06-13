import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useAuthContext } from "../../../context/authContext";

const NavbarIntranet = ({ user }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const currentHour = new Date().getHours();
    const {logout} = useAuthContext()

    let greeting;
    if (currentHour >= 6 && currentHour < 12) {
        greeting = "Buenos días " + user;
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Buenas tardes " + user;
    } else {
        greeting = "Buenas noches " + user;
    }
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSignOut = () => {
        // Lógica para cerrar sesión

        logout()

        console.log("Cerrar sesión");
    };

    return (
        <header className="h-[7vh] md:h-[10vh] border-b border-gray-200 p-4 flex items-center justify-end bg-white shadow-sm">
            <nav className="flex items-center gap-5">
                <span className="text-gray-700 font-semibold">{greeting}</span>

                <button className="text-gray-700 hover:text-gray-900 focus:outline-none">
                    <IoMdNotificationsOutline className="w-8 h-8" />
                </button>

                <div className="relative">
                    <button onClick={toggleDropdown} className="text-gray-700 hover:text-gray-900 focus:outline-none">
                        <FaUserCircle className="w-8 h-8" />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900">Usuario</span>
                            </div>
                            <ul>
                                <li>
                                    <button
                                        onClick={handleSignOut}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                        Cerrar sesión
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}


export default NavbarIntranet