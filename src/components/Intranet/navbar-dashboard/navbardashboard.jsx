import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

const NavbarIntranet = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentHour = new Date().getHours();
  const { logout, auth } = useAuthContext();
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
    // Llamar a la función logout del contexto para actualizar el estado de autenticación
    logout();
    // Limpiar el localStorage
    localStorage.removeItem("usernameOrEmail");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    // Redirigir al usuario a la página de login
    navigate("/login");
  };

  return (
    <header className="h-[7vh] md:h-[10vh] border-b border-gray-200 p-4 flex items-center justify-end bg-white shadow-lg">
      <nav className="flex items-center gap-5">
        <span className="text-gray-800 font-semibold text-lg">{greeting}</span>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-gray-700 hover:text-gray-600 focus:outline-none"
          >
            <FaUserCircle className="w-9 h-9" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900">{auth.role}</span>
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
};

export default NavbarIntranet;
