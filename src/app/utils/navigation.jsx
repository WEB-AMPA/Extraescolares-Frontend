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
    path: ''
  },
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
    path: '/intranet/users/coordinadores'
  },
  {
    key: 'alumnos',
    label: 'Alumnos',
    level: 1,
    icon: <FontAwesomeIcon icon={faUserGraduate} />,
    path: '/intranet/students'
  },
  {
    key: 'asistencia',
    label: 'Asistencia',
    level: 1,
    icon: <FontAwesomeIcon icon={faCalendarCheck} />,
    path: ''
  },
  {
    key: 'asistencia-actividades',
    label: 'Actividades',
    level: 2,
    icon: <FontAwesomeIcon icon={faClipboard} />,
    path: '/intranet/asistencia/actividades'
  },
  {
    key: 'asistencia-desayunos',
    label: 'Desayunos',
    level: 2,
    icon: <FontAwesomeIcon icon={faCoffee} />,
    path: '/intranet/asistencia/desayunos'
  },
  {
    key: 'actividades',
    label: 'Actividades',
    level: 1,
    icon: <FontAwesomeIcon icon={faClipboardList} />,
    path: '/intranet/users'
  }
]

export const MONITOR_SIDEBAR_LINKS = [
   {
    key: 'asistencia-actividades',
    label: 'Actividades',
    level: 1,
    icon: <FontAwesomeIcon icon={faClipboard} />,
    path: '/intranet/asistencia/actividades'
  }
]

export const COORDINADOR_SIDEBAR_LINKS = [
 {
   key: 'asistencia-desayunos',
   label: 'Desayunos',
   level: 1,
   icon: <FontAwesomeIcon icon={faCoffee} />,
   path: '/intranet/asistencia/desayunos'
 }
]

export const SIDEBAR_BOTTOM_LINKS = [
  {
    key: 'ajustes',
    label: 'Ajustes',
    level: 1,
    icon: <FontAwesomeIcon icon={faCog} />,
    path: '/intranet/ajustes'
  },
  {
    key: 'logout',
    label: 'Cerrar Sesión',
    level: 1,
    icon: <FontAwesomeIcon icon={faSignOutAlt} />,
    path: '/login'
  }
]