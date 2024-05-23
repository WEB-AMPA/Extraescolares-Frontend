import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../src/app/pages/layout/layout'
import IntranetLayout from './app/pages/layout/IntranetLayout';
import Activities from "./app/pages/activities/activities.jsx";
/* 
import UsersList from "./app/pages/Usuarios/usuarios";
import LoginPage from "./app/components/login/login";
import ContactFrom from "./app/components/login/contactForm.jsx";
import ForgotPassword from "./app/components/login/forgotPassword.jsx"; */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/intranet" element={<IntranetLayout />} />
        <Route path="/intranet/actividades" element={<Activities />} />
{/*         <Route path="/users" element={<UsersList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contactForm" element={<ContactFrom />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} /> */}
      {/*   <Route path="/intranet" element={<Intranetlayout />}>
          {/* Hijos de la ruta /intranet */}
         {/*  <Route index element={<Users />} />
          <Route path="users" element={<Users />} />
          <Route path="alumnos" element={<alumnos />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;