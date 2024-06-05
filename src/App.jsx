import React, { createContext, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/pages/layout/layout";
import LayoutCentros from "./app/pages/layout/layoutCentros";
import Activities from "./app/pages/activities/activities";
import ActivitiesAttendancePage from "./app/pages/activitiesAttendance/ActivitiesAttendancePage.jsx";
import BreakfastCalendar from "./app/pages/breakfastAttendance/breakfastCalendar.jsx";
import ActivitiesCalendar from "./app/pages/activitiesAttendance/activitiesCalendar.jsx";
import BreakfastAttendancePage from "./app/pages/breakfastAttendance/BreakfastAttendancePage.jsx";
import AboutUs from "./app/pages/layout/layout-about-us";
import PrivacyPolicy from "./app/pages/privacyPolicy/privacyPolicy"
import Contact from "./app/pages/contact/contact";
import Login from "./app/components/login/login";
import OTPInput from "./app/components/login/OTPInput.jsx";
import Recovered from "./app/components/login/Recovered.jsx";
import Reset from "./app/components/login/Reset.jsx";
import { createContext, useState } from "react";

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
    value={{ page, setPage, otp, setOTP, email, setEmail }}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<NavigateComponents />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/intranet/*" element={<IntranetLayout />} />
        <Route path="/contactForm" element={<ContactFrom />} />
        <Route path="/" element={<Layout />} />
        <Route path="/centros" element={<LayoutCentros />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<NavigateComponents />} />
        {/* <Route path="/calendarActivities/:studentId" element={<CalendarActivitiesPage />} /> */}
        <Route path="/calendar/:studentId" element={<BreakfastCalendar/>} />
        <Route path="/calendar/activities/:studentId" element={<ActivitiesCalendar/>} />
        <Route path = "/breakfast" element={<BreakfastAttendancePage/>} />
        <Route path="/intranet/*" element={<IntranetLayout />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/attendances" element={<ActivitiesAttendancePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
    </RecoveryContext.Provider>
  );
}

export default App;
