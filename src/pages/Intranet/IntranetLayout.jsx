// import { useLocation } from 'react-router-dom';
import NavbarIntranet from '../../components/Intranet/navbar-dashboard/navbardashboard';

import Sidebar from '../../components/Intranet/sidebar/sidebar'
// import UsersList from '../Usuarios/usuarios';
import { Outlet } from 'react-router-dom';

import { useAuthContext } from '../../context/authContext';

const IntranetLayout = () => {
  const { auth } = useAuthContext();
  const userName = auth.name || 'test user';

  return (
    <>
    <NavbarIntranet user={userName}/>
    <section >
      <div>
        <Sidebar userRole={auth.role} />
      </div>
      <div className="flex flex-col justify-center p-4">
        <div className='flex flex-row justify-end'>
          
        </div>
        <div className="flex-grow flex flex-col justify-center p-4 ml-64">
          <Outlet />
        </div>
      </div>
    </section>

     </>
  );
};

export default IntranetLayout;
