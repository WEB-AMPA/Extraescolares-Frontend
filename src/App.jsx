import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../src/app/pages/layout/layout'
import IntranetLayout from './app/pages/layout/IntranetLayout';
import AsistenciaTable from "./app/pages/asistencia/asistencia.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/intranet" element={<IntranetLayout />} />
        <Route path="/intranet/asistencia" element={<AsistenciaTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;