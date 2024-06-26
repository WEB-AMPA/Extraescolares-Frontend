
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faHome,
  faClipboardList,
  faClipboard,
  faCoffee,
  faSignOutAlt,
  faCalendarCheck,
  faUserGraduate,
  faChalkboardTeacher,
  faUsers,
  faUserTie
} from '@fortawesome/free-solid-svg-icons';

export const ADMIN_SIDEBAR_LINKS = [
  {
    key: 'dashboard',
    label: 'Inicio',
    level: 1,
    icon: <FontAwesomeIcon icon={faHome} />,
    path: '/intranet'
  },
  {
    key: 'users',
    label: 'Usuarios',
    level: 1,
    icon: <FontAwesomeIcon icon={faUser} />,
    path: '',
    subLinks: [
      {
        key: 'monitores',
        label: 'Monitores',
        level: 2,
        icon: <FontAwesomeIcon icon={faChalkboardTeacher} />,
        path: '/intranet/users/monitor'
      },
      {
        key: 'socios',
        label: 'Socios',
        level: 2,
        icon: <FontAwesomeIcon icon={faUsers} />,
        path: '/intranet/users/socios'
      },
      {
        key: 'coordinadores',
        label: 'Coordinadores',
        level: 2,
        icon: <FontAwesomeIcon icon={faUserTie} />,
        path: '/intranet/users/coordinator'
      }
    ]
  },
  {
    key: 'alumnos',
    label: 'Alumnos',
    level: 1,
    icon: <FontAwesomeIcon icon={faUserGraduate} />,
    path: '/intranet/allstudents'
  },
  {
    key: 'asistencia',
    label: 'Asistencia',
    level: 1,
    icon: <FontAwesomeIcon icon={faCalendarCheck} />,
    path: '',
    subLinks: [
      {
        key: 'asistencia-actividades',
        label: 'Actividades',
        level: 2,
        icon: <FontAwesomeIcon icon={faClipboard} />,
        path: '/intranet/attendances'
      },
      {
        key: 'asistencia-desayunos',
        label: 'Desayunos',
        level: 2,
        icon: <FontAwesomeIcon icon={faCoffee} />,
        path: '/intranet/breakfast'
      }
    ]
  },
  {
    key: 'actividades',
    label: 'Actividades',
    level: 1,
    icon: <FontAwesomeIcon icon={faClipboardList} />,
    path: '/intranet/activities'
  },
  {
    key: 'logout',
    label: 'Cerrar Sesión',
    level: 1,
    icon: <FontAwesomeIcon icon={faSignOutAlt} />,
    path: '/login'
  }
];

export const MONITOR_SIDEBAR_LINKS = [
  {
    key: 'asistencia',
    label: 'Asistencia',
    level: 1,
    icon: <FontAwesomeIcon icon={faCalendarCheck} />,
    path: '',
    subLinks: [
      {
        key: 'asistencia-actividades',
        label: 'Actividades',
        level: 2,
        icon: <FontAwesomeIcon icon={faClipboard} />,
        path: '/intranet/attendances'
      }
    ]
  },
];


export const COORDINATOR_SIDEBAR_LINKS = [
  {
    key: 'asistencia',
    label: 'Asistencia',
    level: 1,
    icon: <FontAwesomeIcon icon={faCalendarCheck} />,
    path: '',
    subLinks: [
      {
        key: 'asistencia-desayunos',
        label: 'Desayunos',
        level: 2,
        icon: <FontAwesomeIcon icon={faCoffee} />,
        path: '/intranet/breakfast'
      }
    ]
  },
  
];


export const PARTNER_SIDEBAR_LINKS = [
  {
    key: 'alumnos',
    label: 'Hijos',
    level: 1,
    icon: <FontAwesomeIcon icon={faUserGraduate} />,
    path: '/intranet/partner-students'
  },
  
];

export const SIDEBAR_BOTTOM_LINKS = [

  {
    key: 'logout',
    label: 'Cerrar Sesión',
    level: 1,
    icon: <FontAwesomeIcon icon={faSignOutAlt} />,
    path: '/login'
  }
];
