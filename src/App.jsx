import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { createContext, useState } from 'react';
import Layout from '../src/app/pages/layout/layout-landing.jsx'
import IntranetLayout from './app/pages/layout/IntranetLayout';
import Socios from "./app/pages/intranet/users/socios.jsx";
import SociosInfo from "./app/pages/intranet/users/sociosInfo.jsx"

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
          <Route path="/" element={<Layout />} />
          <Route path="/intranet/*" element={<IntranetLayout />} />
          <Route path="/intranet/socios"element={<Socios />} />
          <Route path="/intranet/socios/info"element={<SociosInfo />} />
          {/*           <Route path="/about-us" element={<AboutUs />} />
          <Route path="/centros" element={<LayoutCentros />} />
          <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<NavigateComponents />} />
          <Route path="/users" element={<Users />} />
          <Route path="/calendar/:studentId" element={<BreakfastCalendar/>} />
          <Route path="/calendar/activities/:studentId/:activityId" element={<ActivitiesCalendar/>} />
          <Route path = "/breakfast" element={<BreakfastAttendancePage/>} />
          <Route path="/attendances" element={<ActivitiesAttendancePage />} />*/}
        </Routes>
      </BrowserRouter>

    </RecoveryContext.Provider>
  );
}

export default App;