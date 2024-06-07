import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar'
import Navbar from '../../components/navbar-dashboard/navbar';


const IntranetLayout = () => {

  return (
   
    <div className="min-h-screen grid grid-cols-1">
      <Sidebar />
      <div className="xl:col-span-5 p-8">
        <Navbar />
        <div className="overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default IntranetLayout;
