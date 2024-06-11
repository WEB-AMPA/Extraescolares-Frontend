// import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components/Web/header/Header';
import Sidebar from '../../components/Intranet/sidebar/sidebar'
// import UsersList from '../Usuarios/usuarios';
import { Outlet } from 'react-router-dom';
// import Sidebar1 from '../../components/sidebar/sidebar1';

const userRole = 'admin' //ESTO ES SOLO PARA HACER PRUEBAS, EL LOGIN DEBE ENVIAR EL ROLE PARA QUE SEA DINAMICO

const IntranetLayout = () => {
  const { state } = useLocation()
  const userName = state?.userName || 'test users'

  return (
    <section className="flex  flex-row justify-around" >
      <div >
      <Sidebar userRole={userRole} />
      </div>
      <div className="flex flex-col justify-center p-4">
        <div className='flex flex-row justify-end'>
          <Header userName={userName} />
        </div>
        <div>
          {<Outlet />}
        </div>
        
      </div>
    </section>
  );
};

export default IntranetLayout;
