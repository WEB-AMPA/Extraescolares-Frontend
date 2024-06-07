// import { Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar'



const IntranetLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="flex-grow ml-64">
        <Outlet />
      </div>

    </div>
  );
};

export default IntranetLayout;
