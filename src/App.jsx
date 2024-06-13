import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";
import LandingPage from "./pages/Home/LandingPage";
import IntranetLayout from "./pages/Intranet/IntranetLayout";
import Centros from "./pages/Centros/centros";
import AboutUsPage from "./pages/AboutUsPage/aboutUsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy/privacyPolicy";
import Contact from "./pages/Contact/contact";
import ActivitiesPage from "./pages/Activities/ActivitiesPage";
import Breakfast from "./components/Intranet/breakfastAttendance/Breakfast";
import BreakfastCalendar from "./components/Intranet/calendar/breakfastCalendar";
import ActivitiesAttendancePage from "./components/Intranet/activitiesAttendance/ActivitiesAttendance";
import ActivitiesCalendar from "./components/Intranet/calendar/activitiesCalendar";
import MonitoresTable from "./components/Intranet/monitor-CRUD/monitor";
import LoginPage from "./pages/loginPage/loginPage";
import PrivateRoute from "./routes/PrivateRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage/UnauthorizedPage";
import UserForm from "./components/Intranet/user-CRUD/createUser.jsx";
import PartnersTable from "./components/Intranet/partner-CRUD/partner.jsx";
import StudentsList from "./components/Intranet/students-partner-CRUD/students-partner.jsx";



function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/centros" element={<Centros />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route element={<PrivateRoute roles={['admin', 'partner', 'monitor', 'coordinator']} />}>
            <Route path="/intranet" element={<IntranetLayout />}>
              <Route path="calendar/:studentId" element={<BreakfastCalendar />} />
              <Route path="calendar/activities/:activitiesStudentId" element={<ActivitiesCalendar />} />
              <Route path="breakfast" element={<Breakfast />} />
              <Route path="attendances" element={<ActivitiesAttendancePage />} />
              <Route path="users/monitor" element={<MonitoresTable />} />
              <Route path="createuser" element={<UserForm />} />
              <Route path="user/partner" element={<PartnersTable />} />
              <Route path="students/:partnerId" element={<StudentsList />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
