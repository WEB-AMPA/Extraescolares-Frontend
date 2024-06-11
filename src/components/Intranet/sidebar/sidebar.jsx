import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './sidebar.css';
import { ADMIN_SIDEBAR_LINKS, MONITOR_SIDEBAR_LINKS, COORDINATOR_SIDEBAR_LINKS, SIDEBAR_BOTTOM_LINKS,  PARTNER_SIDEBAR_LINKS } from '../../../utils/navigation';

function Sidebar({ userRole }) { // Asegúrate de recibir el rol del usuario
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [dropdowns, setDropdowns] = useState({});

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleDropdown = (dropdown) => {
    setDropdowns({ ...dropdowns, [dropdown]: !dropdowns[dropdown] });
  };

  // Determina los enlaces según el rol del usuario
  let sidebarLinks;
  switch (userRole) {
    case 'admin':
      sidebarLinks = ADMIN_SIDEBAR_LINKS;
      break;
    case 'monitor':
      sidebarLinks = MONITOR_SIDEBAR_LINKS;
      break;
    case 'coordinator':
      sidebarLinks = COORDINATOR_SIDEBAR_LINKS;
      break;
    case 'partner': // Agregamos el caso de 'partner'
      sidebarLinks = PARTNER_SIDEBAR_LINKS; // Por ejemplo, podríamos asignar los mismos enlaces que para 'admin'
      break;

    default:
      sidebarLinks = [];
  }

  // Filtrar los enlaces del footer del sidebar para evitar duplicados
  const filteredSidebarLinks = sidebarLinks.filter(link => !SIDEBAR_BOTTOM_LINKS.find(footerLink => footerLink.key === link.key));

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="p-2 lg:hidden fixed top-0 left-0 z-20 bg-white rounded-md shadow-md"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div
        className={`lg:block ${sidebarVisible ? 'block' : 'hidden'} bg-white w-64 h-screen fixed z-10 top-0 left-0 rounded-none border-none shadow-lg`}
      >
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-center py-4">
            <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
          </div>
          {filteredSidebarLinks.map((link) => (
            <div key={link.key} className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown(link.key)}
                className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700 w-full"
              >
                <div className="grid mr-2 place-items-center">
                  <FontAwesomeIcon icon={link.icon.props.icon} />
                </div>
                <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
                  {link.label}
                </p>
                {link.subLinks && (
                  <span className="ml-auto">
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`transform duration-300 ${dropdowns[link.key] ? 'rotate-180' : ''}`}
                    />
                  </span>
                )}
              </button>
              {dropdowns[link.key] && link.subLinks && (
                <div className="mt-2 space-y-2 pl-8">
                  {link.subLinks.map((subLink) => (
                    <Link
                      key={subLink.key}
                      to={subLink.path}
                      className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700"
                    >
                      <FontAwesomeIcon icon={subLink.icon.props.icon} />
                      <span className="ml-2">{subLink.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="p-4 space-y-4">
          <ul>
            {SIDEBAR_BOTTOM_LINKS.map((link) => (
              <li key={link.key} className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700">
                <Link
                  to={link.path}
                  onClick={toggleSidebar}
                >
                  {link.icon}
                  <span className='p-4 space-x-4'>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
