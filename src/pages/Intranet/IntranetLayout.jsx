import { useLocation } from 'react-router-dom';
import { Header } from '../../components/Web/header/Header';
import Sidebar from '../../components/Intranet/sidebar/sidebar';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';

const IntranetLayout = () => {
  const { auth } = useAuthContext();
  const userName = auth.user || 'test user';

  return (
    <section className="flex flex-row justify-around">
      <div>
        <Sidebar userRole={auth.role} />
      </div>
      <div className="flex flex-col justify-center p-4">
        <div className="flex flex-row justify-end">
          <Header userName={userName} />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default IntranetLayout;
