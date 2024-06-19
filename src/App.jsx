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
import ActivitiesStudent from "./components/Intranet/activities-students-CRUD/activities-students.jsx";
import CoordinatorTable from "./components/Intranet/coordinator-CRUD/coordinator.jsx";
import StudentsPartner from "./components/Intranet/students-partner-CRUD/students-partner.jsx";
import Students from "./components/Intranet/students-CRUD/students.jsx";
import CreateStudent from "./components/Intranet/students-CRUD/createStudent.jsx";
import AssignActivity from "./components/Intranet/assign-activities/assign-activities.jsx";
import Activities from "./components/Intranet/activities-CRUD/ActivitiesCrud.jsx";
import RequestPasswordReset from "./components/Web/password-reset/password-reset-request.jsx";
import ResetPassword from "./components/Web/password-reset/password-reset-form.jsx";
import CreateActivityForm from "./components/Intranet/activities-CRUD/CreateActivity.jsx";
import StudentsPartnerAdmin from "./components/Intranet/students-partner-CRUD/students-partner-admin.jsx";
import IntranetStart from "./components/Intranet/intranet-start/intranet-start.jsx";
import ActivitiesStudentPartner from "./components/Intranet/activities-students-CRUD/activities-students-partner.jsx";


// Import FontAwesome library and add icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';


library.add(fas);

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
          <Route path="/request-password-reset" element={<RequestPasswordReset />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Layout de Intranet */}
          <Route element={<PrivateRoute roles={['admin', 'partner', 'monitor', 'coordinator']} />}>
            <Route path="/intranet" element={<IntranetLayout />}>
             <Route index element={<IntranetStart />} />
              {/* Rutas generales dentro de la intranet */}

              {/* Rutas específicas para admin */}
              <Route element={<PrivateRoute roles={['admin']} />}>
                <Route path="createuser" element={<UserForm />} />
                <Route path="users/monitor" element={<MonitoresTable />} />
                <Route path="users/socios" element={<PartnersTable />} />
                <Route path="users/coordinator" element={<CoordinatorTable />} />
                <Route path="students/:partnerId" element={<StudentsPartnerAdmin />} />
                <Route path="allstudents" element={<Students />} />
                <Route path="createstudent" element={<CreateStudent />} />
                <Route path="asignactivities/:studentId" element={<AssignActivity />} />
                <Route path="activities" element={<Activities />} />
                <Route path="createactivity" element={<CreateActivityForm />} />
                <Route path="activities-students/:studentId" element={<ActivitiesStudent />} />

              </Route>

              {/* Rutas específicas para partner */}
              <Route element={<PrivateRoute roles={['partner','admin']} />}>
                <Route path="partner-students" element={<StudentsPartner />} />
                <Route path="activities-student-partner/:studentId" element={<ActivitiesStudentPartner />} />
                <Route path="allstudents" element={<Students />} />
              </Route>

              {/* Rutas específicas para monitor */}
              <Route element={<PrivateRoute roles={['monitor', 'admin']} />}>
                <Route path="attendances" element={<ActivitiesAttendancePage />} />
                <Route path="calendar/activities/:activitiesStudentId" element={<ActivitiesCalendar />} />
                <Route path="allstudents" element={<Students />} />
              </Route>

              {/* Rutas específicas para coordinator */}
              <Route element={<PrivateRoute roles={['coordinator', 'admin']} />}>
                <Route path="breakfast" element={<Breakfast />} />
                <Route path="calendar/:studentId" element={<BreakfastCalendar />} />
                <Route path="allstudents" element={<Students />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;

