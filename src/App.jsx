import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../src/app/pages/layout/layout";
import IntranetLayout from "./app/pages/layout/IntranetLayout";
import Navbar from "./app/components/navbar/Navbar";
import UsersList from "./app/pages/Usuarios/usuarios";
import LoginPage from "./app/components/login/login";
import ContactFrom from "./app/components/login/ContactForm.jsx";
import ForgotPassword from "./app/components/login/forgotPassword.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/intranet/*" element={<IntranetLayout />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contactForm" element={<ContactFrom />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
