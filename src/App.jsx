import React, { createContext, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/pages/layout/layout-landing.jsx";
import LayoutCentros from "./app/pages/layout/layoutCentros";
import IntranetLayout from "./app/pages/layout/IntranetLayout";
import UsersList from "./app/pages/Usuarios/usuarios";
import ContactFrom from "./app/components/login/ContactForm.jsx";
import Login from "./app/components/login/login.jsx";
import OTPInput from "./app/components/login/OTPInput.jsx";
import Recovered from "./app/components/login/Recovered.jsx";
import Reset from "./app/components/login/Reset.jsx";
import AboutUs from "./app/pages/layout/layout-about-us";
import PrivacyPolicy from "./app/pages/privacyPolicy/privacyPolicy";

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
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<NavigateComponents />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/intranet/*" element={<IntranetLayout />} />
        <Route path="/contactForm" element={<ContactFrom />} />
        <Route path="/" element={<Layout />} />
        <Route path="/centros" element={<LayoutCentros />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
