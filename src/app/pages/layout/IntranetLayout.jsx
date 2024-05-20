import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar'
import Users from '../Usuarios/usuarios';


const IntranetLayout = () => {
  return (
    <div className="app-container flex">
      <Sidebar />
      <div className="content flex-1 p-4">
        <Routes>
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
};

export default IntranetLayout;
