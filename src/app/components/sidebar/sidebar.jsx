import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faHome,
  faClipboardList,
  faClipboard,
  faCoffee,
  faWallet,
  faSignOutAlt,
  faBars,
  faCog,
  faCalendarCheck,
  faUserGraduate,
  faChevronDown,
  faChalkboardTeacher, // Para Monitores
  faUsers, // Para Socios
  faUserTie // Para Coordinadores
} from '@fortawesome/free-solid-svg-icons';

import './sidebar.css'

function Sidebar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [usersDropdownVisible, setUsersDropdownVisible] = useState(false);
  const [attendanceDropdownVisible, setAttendanceDropdownVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleUsersDropdown = () => {
    setUsersDropdownVisible(!usersDropdownVisible);
  };

  const toggleAttendanceDropdown = () => {
    setAttendanceDropdownVisible(!attendanceDropdownVisible);
  };

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
          {/* Espacio para el logo */}
          <div className="flex items-center justify-center py-4">
            <img src="/path/to/your/logo.png" alt="Logo" className="h-16 w-auto" />
          </div>
          <div
            role="button"
            onClick={toggleSidebar}
            aria-label="dashboard"
            className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700" >
        
        <div className="grid mr-2 place-items-center">
      <FontAwesomeIcon icon={faHome} />
    </div>
            <span>Inicio</span>
          </div>
          <div className="relative">
          <button
    type="button"
    onClick={toggleUsersDropdown}
    className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700 w-full"
  >
    <div className="grid mr-2 place-items-center">
      <FontAwesomeIcon icon={faUser} />
    </div>
    <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
      Usuarios
    </p>
    <span className="ml-auto">
      <FontAwesomeIcon
        icon={faChevronDown}
        className={`transform duration-300 ${usersDropdownVisible ? 'rotate-180' : ''}`}
      />
    </span>
  </button>
            {usersDropdownVisible && (
              <div className="mt-2 space-y-2 pl-8">
                <Link to ="/users"
                  className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700"

                >
                  <FontAwesomeIcon icon={faChalkboardTeacher} />
                  <span className="ml-2">Monitores</span>
                </Link>
                <a
                  href="#"
                  className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700"

                >
                  <FontAwesomeIcon icon={faUsers} />
                  <span className="ml-2">Socios</span>
                </a>
                <a
                  href="#"
                  className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700"

                >
                  <FontAwesomeIcon icon={faUserTie} />
                  <span className="ml-2">Coordinadores</span>
                </a>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div
              role="button"
              onClick={toggleSidebar}
              className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700"

            >
            <div className="grid mr-2 place-items-center">
              <FontAwesomeIcon icon={faUserGraduate} />
              </div>

              <span>Alumnos</span>
            </div>
            <div className="relative">
  <button
    type="button"
    onClick={toggleAttendanceDropdown}
    className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700 w-full"
  >
    <div className="grid mr-2 place-items-center">
      <FontAwesomeIcon icon={faCalendarCheck} />
    </div>
    <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
      Asistencia
    </p>
    <span className="ml-auto">
      <FontAwesomeIcon
        icon={faChevronDown}
        className={`transform duration-300 ${attendanceDropdownVisible ? 'rotate-180' : ''}`}
      />
    </span>
  </button>
              {attendanceDropdownVisible && (
                <div className="mt-2 space-y-2 pl-8">
                  <a
                    href="#"
                    className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700"

                  >
                  
                    <FontAwesomeIcon icon={faClipboard} />
                    <span className="ml-2">Actividades</span>
                  </a>
                  <a
                    href="#"
                    className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700"

                  >
                    <FontAwesomeIcon icon={faCoffee} />
                    <span className="ml-2">Desayunos</span>
                  </a>
                </div>
              )}
            </div>

            <div
              role="button"
              onClick={toggleSidebar}
              className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700"

            >

<div className="grid mr-2 place-items-center">
              <FontAwesomeIcon icon={faClipboardList} />
              </div>

              <span>Actividades</span>
            </div>
            <div
              role="button"
              onClick={toggleSidebar}
              className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700"

            >
             <div className="grid mr-1 place-items-center">
              <FontAwesomeIcon icon={faWallet} />
              </div>
              <span>Remesas</span>
            </div>
            <div
              role="button"
              onClick={toggleSidebar}
              className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700"

            >
            <div className="grid mr-2 place-items-center">
            <FontAwesomeIcon icon={faCog} />
            </div>
              
              <span>Ajustes</span>
            </div>
            <div
              role="button"
              onClick={toggleSidebar}
              className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700"

            >
            <div className="grid mr-2 place-items-center">
              <FontAwesomeIcon icon={faSignOutAlt} />
              </div>
              <span>Cerrar sesión</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
