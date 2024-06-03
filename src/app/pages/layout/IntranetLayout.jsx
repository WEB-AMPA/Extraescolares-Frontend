import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar'


const IntranetLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6">
      <Sidebar />
      <div className="xl:col-span-5 p-8">
        <div className="h[90vh] overflow-y-scroll">
          <Outlet />
      </div> 
    </div>
    </div>
  );
};

export default IntranetLayout;
