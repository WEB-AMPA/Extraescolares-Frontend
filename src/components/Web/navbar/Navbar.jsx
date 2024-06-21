import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import logo from '../../../../public/logo.png'; // Asegúrate de que esta ruta sea correcta

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'font-semibold text-[1rem] bg-yellow-200 rounded-lg border-b-2 border-yellow-400 mx-2'  // Añadir margen horizontal
      : 'font-semibold text-[1rem] mx-1';  // Añadir margen horizontal
  };

  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 right-0 z-50 py-2">
      <div className="flex items-center justify-between w-full px-4">
        <div className="navbar-start flex items-center">
          <div className="dropdown lg:hidden">
            <button
              tabIndex={0}
              className="btn btn-ghost"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              onClick={handleMenuToggle}
            >
              <FontAwesomeIcon
                icon={faBars}
                className={`h-6 w-6 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-90' : ''}`}
              />
            </button>
            {isOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li><a href="/" className={getLinkClass('/')}>INICIO</a></li>
                <li><a href="/about-us" className={getLinkClass('/about-us')}>QUIENES SOMOS</a></li>
                <li><a href="/activities" className={getLinkClass('/activities')}>ACTIVIDADES</a></li>
                <li><a href="/centros" className={getLinkClass('/centros')}>CENTROS</a></li>
                <li><a href="/contact" className={getLinkClass('/contact')}>CONTÁCTANOS</a></li>
              </ul>
            )}
          </div>
          <a href="/" className="hidden lg:block">
            <img src={logo} alt="Logo" className="h-[6rem] w-[6rem]" />
          </a>
        </div>
        <a href="/" className="lg:hidden mx-auto">
          <img src={logo} alt="Logo" className="h-[5rem] w-[5rem]" />
        </a>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a href="/" className={getLinkClass('/')}>INICIO</a></li>
            <li><a href="/about-us" className={getLinkClass('/about-us')}>QUIENES SOMOS</a></li>
            <li><a href="/activities" className={getLinkClass('/activities')}>ACTIVIDADES</a></li>
            <li><a href="/centros" className={getLinkClass('/centros')}>CENTROS</a></li>
            <li><a href="/contact" className={getLinkClass('/contact')}>CONTÁCTANOS</a></li>
          </ul>
        </div>
      </div>
      <div className="navbar-end lg:flex lg:items-center">
          <a href="/login" className="btn bg-blue-600 text-white hover:bg-blue-700 ml-2">
            ACCESOS
          </a>
        </div>
    </div>
  );
}

export default Navbar;
