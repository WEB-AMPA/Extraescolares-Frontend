import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import NavbarIntranet from '../../components/Intranet/navbar-dashboard/navbardashboard.jsx'; 
import Sidebar from '../../components/Intranet/sidebar/sidebar.jsx'; 

const IntranetLayout = () => {
  const { auth } = useAuthContext();
  const userName = auth.name || 'test user';

  return (
    <>
      <NavbarIntranet user={userName} />
      <section className="flex">
        <Sidebar userRole={auth.role} />
        <div className="flex-grow p-4 lg:ml-64 ml-0">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default IntranetLayout;
