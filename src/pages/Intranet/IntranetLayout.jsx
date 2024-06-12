// import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavbarIntranet from '../../components/Intranet/navbar-dashboard/navbardashboard';

import Sidebar from '../../components/Intranet/sidebar/sidebar'
// import UsersList from '../Usuarios/usuarios';
import { Outlet } from 'react-router-dom';

// import Sidebar1 from '../../components/sidebar/sidebar1';

const userRole = 'admin' //ESTO ES SOLO PARA HACER PRUEBAS, EL LOGIN DEBE ENVIAR EL ROLE PARA QUE SEA DINAMICO

const IntranetLayout = () => {
  const { state } = useLocation()
  // const userName = state?.userName || 'test users'

  return (
    <>
    <NavbarIntranet/>

  
    <section className="flex ml-14 flex-row " >
      <div >
      <Sidebar userRole={userRole} />
      </div>
      <div className="flex flex-col justify-center p-4">
        <div className='flex flex-row justify-end'>
          
        </div>
        <div>
          {<Outlet />}
        </div>
        
      </div>
    </section>

     </>
  );
};

export default IntranetLayout;
