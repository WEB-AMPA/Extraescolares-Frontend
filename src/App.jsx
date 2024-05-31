import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/pages/layout/layout";
import IntranetLayout from "./app/pages/layout/IntranetLayout";
import Navbar from "./app/components/navbar/Navbar";
import UsersList from "./app/pages/Usuarios/usuarios";
import ContactFrom from "./app/components/login/ContactForm.jsx";
import Login from "./app/components/login/Login.jsx";
import OTPInput from "./app/components/login/OTPInput.jsx";
import Recovered from "./app/components/login/Recovered.jsx";
import Reset from "./app/components/login/Reset.jsx";

export const RecoveryContext = createContext();

function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  function NavigateComponents() {
    if (page === "login") return <Login />;
    if (page === "otp") return <OTPInput />;
    if (page === "reset") return <Reset />;
    return <Recovered />;
  }

  return (
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, email, setEmail }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<NavigateComponents />} />
          <Route path="/" element={<Layout />} />
          <Route path="/intranet/*" element={<IntranetLayout />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/contactForm" element={<ContactFrom />} />
          <Route path="/Navbar" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </RecoveryContext.Provider>
  );
}

export default App;
