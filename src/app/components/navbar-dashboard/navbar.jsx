import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";


const NavBar = () => {
    const currentHour = new Date().getHours();

    let greeting;
    if (currentHour >= 6 && currentHour < 12) {
        greeting = "Buenos días";
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Buenas tardes";
    } else {
        greeting = "Buenas noches";
    }

    return (
        <header className="h-[7vh] md:h-[10vh] border-b border-gray-900 p-8 flex items-center justify-end">
            <nav className="flex items-center gap-5">
                {greeting}

                <button>
                    <IoMdNotificationsOutline className="w-8 h-6" />
                </button>

                <button>
                    <FaUserCircle className="w-8 h-6" />
                </button>
            </nav>
        </header>
    );
};

export default NavBar;
