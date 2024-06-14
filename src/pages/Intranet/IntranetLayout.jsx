import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import NavbarIntranet from '../../components/Intranet/navbar-dashboard/navbardashboard.jsx'; // Asegúrate de ajustar la ruta de importación según tu estructura de carpetas
import Sidebar from '../../components/Intranet/sidebar/sidebar.jsx'; // Asegúrate de ajustar la ruta de importación según tu estructura de carpetas

const IntranetLayout = () => {
  const { auth } = useAuthContext();
  const userName = auth.name || 'test user';

  return (
    <>
      <NavbarIntranet user={userName} />
      <section className="flex">
        <Sidebar userRole={auth.role} />
        <div className="flex-grow p-4 ml-64">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default IntranetLayout;
