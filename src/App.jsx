import "./App.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../src/app/pages/layout/layout-landing'
import IntranetLayout from './app/pages/layout/IntranetLayout';
import Navbar from './app/components/navbar/Navbar';
import UsersList from "./app/pages/Usuarios/usuarios";
import LayoutCentros from "./app/pages/layout/layoutCentros";
import ActivitiesAttendance from "./app/pages/activitiesAttendance/activitiesAttendance";
import Activities from "./app/pages/activities/activities";
import BreakfastCalendar from "./app/pages/breakfastAttendance/breakfastCalendar.jsx";

// import CalendarActivitiesPage from "./app/pages/activitiesCalendar/CalendarActivitiesPage";
import BreakfastAttendancePage from "./app/pages/breakfastAttendance/BreakfastAttendancePage.jsx";
import AboutUs from "./app/pages/layout/layout-about-us";
import PrivacyPolicy from "./app/pages/privacyPolicy/privacyPolicy"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/centros" element={<LayoutCentros />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/attendances" element={<ActivitiesAttendance />} />
        {/* <Route path="/calendarActivities/:studentId" element={<CalendarActivitiesPage />} /> */}
        <Route path="/calendar/:studentId" element={<BreakfastCalendar/>} />
        <Route path = "/breakfast" element={<BreakfastAttendancePage/>} />

        <Route path="/intranet/*" element={<IntranetLayout />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;