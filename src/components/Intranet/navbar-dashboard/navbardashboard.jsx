import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

const NavbarIntranet = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentHour = new Date().getHours();
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  let greeting;
  if (currentHour >= 6 && currentHour < 12) {
    greeting = "Buenos días: " + user;
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Buenas tardes: " + user;
  } else {
    greeting = "Buenas noches: " + user;
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    logout();
    localStorage.removeItem("usernameOrEmail");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="h-[8vh] border-b border-gray-200 px-4 py-2 flex items-center justify-between bg-white shadow-md">
      <div className="flex-grow"></div>
      <nav className="flex items-center gap-5">
        <span className="text-gray-700 font-semibold text-sm sm:text-base lg:text-m">{greeting}</span>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-gray-600 hover:text-gray-900 focus:outline-none flex items-center gap-2"
          >
            <FaUserCircle className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900">Usuario</span>
              </div>
              <ul>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left"
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
};

export default NavbarIntranet;
