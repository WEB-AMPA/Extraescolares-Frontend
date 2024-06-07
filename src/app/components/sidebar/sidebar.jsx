import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { FaClipboard } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { FaCoffee } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { FaCogs } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import './sidebar.css'

function Sidebar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [usersDropdownVisible, setUsersDropdownVisible] = useState(false);
  const [attendanceDropdownVisible, setAttendanceDropdownVisible] = useState(false);

  const location = useLocation();
  const { state } = location;
  console.log(state);

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
      <button onClick={toggleSidebar} className="p-2 lg:hidden fixed top-0 left-0 z-20 bg-white rounded-md shadow-md">
        <FaBars />
      </button>
      <div
        className={`lg:block ${sidebarVisible ? 'block' : 'hidden'} bg-white w-64 h-screen fixed z-10 top-0 left-0 rounded-none border-none shadow-lg`}
      >
        <div className=" p-4 space-y-4">
          <div className="flex items-center justify-center py-4">
            <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
          </div>



          <Link to="/" role="button" onClick={toggleSidebar} aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700">
            <div className="grid mr-2 place-items-center">
              <FaHome />
            </div>

            <span>Inicio</span>
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={toggleUsersDropdown}
              className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700 w-full"
            >
              <div className="grid mr-2 place-items-center">
                <FaUserEdit />
              </div>
              <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
                Usuarios
              </p>



              <span className="ml-auto">
                <FaChevronDown className={`transform duration-300 ${usersDropdownVisible ? 'rotate-180' : ''}`} />
              </span>
            </button>


            {usersDropdownVisible && (
              <div className="mt-2 space-y-2 pl-8">
                <Link to="/intranet/monitores"
                  className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700">
                  <FaChalkboardTeacher />
                  <span className="ml-2">Monitores</span>
                </Link>


                <Link to="/intranet/socios"
                  className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700">
                  <FaUsers />
                  <span className="ml-2">Socios</span>
                </Link>


                <Link to="/intranet/coordinadores"
                  className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700">
                  <FaUserTie />
                  <span className="ml-2">Coordinadores</span>
                </Link>
              </div>

            )}
          </div>


          <div className="space-y-4">
            <Link to="/intranet/alumnos" role="button" onClick={toggleSidebar} className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700">
              <div className="grid mr-2 place-items-center">
                <FaUserGraduate />
              </div>
              <span>Alumnos</span>
            </Link>

            <div className="relative">
              <button type="button" onClick={toggleAttendanceDropdown} className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700 w-full">
                <div className="grid mr-2 place-items-center">
                  <FaCalendarCheck />
                </div>
                <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
                  Asistencia
                </p>


                <span className="ml-auto"> <FaChevronDown className={`transform duration-300 ${attendanceDropdownVisible ? 'rotate-180' : ''}`} />
                </span>
              </button>


              {attendanceDropdownVisible && (
                <div className="mt-2 space-y-2 pl-8">
                  <Link to="/intranet/asistencia"
                    className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700">
                    <FaClipboard />
                    <span className="ml-2">Asistencia</span>
                  </Link>

                  
                  <Link to="/intranet/desayunos" className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700">
                    <FaCoffee />
                    <span className="ml-2">Desayunos</span>
                  </Link>
                </div>
              )}
            </div>

            <Link to="/intranet/actividades" role="button" onClick={toggleSidebar} className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700">
              <div className="grid mr-2 place-items-center">
                <FaClipboardList />
              </div>
              <span>Actividades</span>
            </Link>
          {/*   </div>
             <div
              role="button"
              onClick={toggleSidebar}
              className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-50">
 */}

            <Link to="/intranet/remesas" role="button" onClick={toggleSidebar} className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700" >
              <div className="grid mr-1 place-items-center">
                <FaWallet />
              </div>
              <span>Remesas</span>
            </Link>

            <Link to="/intranet/ajustes" role="button" onClick={toggleSidebar} className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700">
              <div className="grid mr-2 place-items-center">
                <FaCogs />
              </div>
              <span>Ajustes</span>
            </Link>


            <Link to="/login" role="button" onClick={toggleSidebar} className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700">
              <div className="grid mr-2 place-items-center">
                <FaSignOutAlt />
              </div>
              <span>Cerrar sesión</span>
            </Link>


          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
