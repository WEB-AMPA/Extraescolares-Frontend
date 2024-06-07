import "./App.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../src/app/pages/layout/layout-landing'
import IntranetLayout from './app/pages/layout/IntranetLayout';
import UsersList from "./app/pages/Usuarios/usuarios";
import LayoutCentros from "./app/pages/layout/layoutCentros";
import Activities from "./app/pages/activities/activities";
import BreakfastCalendar from "./app/components/calendar/breakfastCalendar.jsx";
import ActivitiesCalendar from "./app/components/calendar/activitiesCalendar.jsx";
import BreakfastAttendancePage from "./app/pages/breakfastAttendance/BreakfastAttendancePage.jsx";
import AboutUs from "./app/pages/layout/layout-about-us";
import PrivacyPolicy from "./app/pages/privacyPolicy/privacyPolicy"
import ActivitiesAttendancePage from "./app/pages/activitiesAttendance/activitiesAttendancePage.jsx";





function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/centros" element={<LayoutCentros />} />
        <Route path="/activities" element={<Activities />} />
        {/* <Route path="/calendarActivities/:studentId" element={<CalendarActivitiesPage />} /> */}
        <Route path="/calendar/:studentId" element={<BreakfastCalendar/>} />
        <Route path="/calendar/activities/:activitiesStudentId" element={<ActivitiesCalendar />} />
        <Route path = "/breakfast" element={<BreakfastAttendancePage/>} />
        <Route path="/intranet/*" element={<IntranetLayout />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/attendances" element={<ActivitiesAttendancePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;