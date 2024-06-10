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
import { ADMIN_SIDEBAR_LINKS, MONITOR_SIDEBAR_LINKS, COORDINADOR_SIDEBAR_LINKS, SIDEBAR_BOTTOM_LINKS } from '../../utils/navigation';
// import { useLocation } from 'react-router-dom';

function Sidebar1() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [usersDropdownVisible, setUsersDropdownVisible] = useState(false);
  const [attendanceDropdownVisible, setAttendanceDropdownVisible] = useState(false);

  // const { state } = useLocation()
  // console.log(state);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleUsersDropdown = () => {
    setUsersDropdownVisible(!usersDropdownVisible);
  };

  const toggleAttendanceDropdown = () => {
    setAttendanceDropdownVisible(!attendanceDropdownVisible);
  };

  let LINKS = ADMIN_SIDEBAR_LINKS
  const role = 'admin'

  if (role === 'monitor')
    LINKS = MONITOR_SIDEBAR_LINKS
  else if (role === 'partner')
    LINKS = ADMIN_SIDEBAR_LINKS
  else if (role === 'coordinator')
    LINKS = COORDINADOR_SIDEBAR_LINKS


  return (
    <>
     <button
        onClick={toggleSidebar}
        className="p-2 lg:hidden fixed top-0 left-0 z-20 bg-white rounded-md shadow-md"
      >
        <FontAwesomeIcon icon={faBars} />
      </button> 
    <section
        className={`lg:block ${sidebarVisible ? 'block' : 'hidden'} flex flex-col justify-between bg-white w-64 h-screen fixed z-10 top-0 left-0 rounded-none border-none shadow-lg`}
      >
      {/* <div className="p-4 space-y-4">
       
      </div> */}
      <div className="p-4 space-y-4">
      <div className="flex items-center justify-center py-4">
            <img src="/logo.png" alt="Logo" className="h-24 w-auto" />
          </div>
        <ul>
          {LINKS.map((link) => (
            link.level === 1
            ?
            <li key={link.key}  className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700">
              <Link
                to={link.path}
                onClick={toggleSidebar}
              >
                {link.icon}
                <span className='p-4 space-x-4'>{link.label}</span>
              </Link>
            </li>
            : usersDropdownVisible && 
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
      <div className="p-4 space-y-4">
        <ul>
         {
          SIDEBAR_BOTTOM_LINKS.map((link) =>
            <li key={link.path} className="relative px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group hover-bg-gray-100 hover-text-gray-700">
              <Link
                to={link.path}
                onClick={toggleSidebar}
              >
                {link.icon}
                <span className='p-4 space-x-4'>{link.label}</span>
              </Link>
            </li>
          )  
         }
        </ul>
      </div>
    </section>
    </>
  );
}

export default Sidebar1;
