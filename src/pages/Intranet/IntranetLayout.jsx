import { useLocation } from 'react-router-dom';
import NavbarIntranet from '../../components/Intranet/navbar-dashboard/navbardashboard';

import Sidebar from '../../components/Intranet/sidebar/sidebar'
// import UsersList from '../Usuarios/usuarios';
import { Outlet } from 'react-router-dom';

import { useAuthContext } from '../../context/authContext';

const IntranetLayout = () => {
  const { auth } = useAuthContext();
  const userName = auth.user || 'test user';

  return (
    <>
    <NavbarIntranet/>

  
    <section className="flexml-14 flex-row ">
      <div>
        <Sidebar userRole={auth.role} />
      </div>
      <div className="flex flex-col justify-center p-4">
        <div className='flex flex-row justify-end'>
          
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </section>

     </>
  );
};

export default IntranetLayout;
