import NavbarDashboard from '../../components/navbar-dashboard/navbardashboard';
import Sidebar from '../../components/sidebar/sidebar';

const Intranet = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <NavbarDashboard />
        <div className="flex-1 p-4 mt-16">
          <h1 className="text-2xl font-bold">Bienvenido a tu Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default Intranet;
