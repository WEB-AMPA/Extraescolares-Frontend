import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../src/app/pages/layout/layout'
import IntranetLayout from './app/pages/layout/IntranetLayout';
import Navbar from './app/components/navbar/Navbar';
import UsersList from "./app/pages/Usuarios/usuarios";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/intranet/*" element={<IntranetLayout />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;