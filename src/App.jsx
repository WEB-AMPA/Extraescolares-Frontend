import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { createContext, useState } from "react";
import { AuthContextProvider } from "./context/authContext.jsx";
import LandingPage from "./pages/Home/LandingPage.jsx";
import IntranetLayout from "./pages/Intranet/IntranetLayout.jsx";
import Centros from "./pages/Centros/centros.jsx";
import AboutUsPage from "./pages/AboutUsPage/aboutUsPage.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy/privacyPolicy.jsx";
import Contact from "./pages/Contact/contact.jsx";
import ActivitiesPage from "./pages/Activities/ActivitiesPage.jsx";
import Breakfast from "./components/Intranet/breakfastAttendance/Breakfast.jsx";
import BreakfastCalendar from "./components/Intranet/calendar/breakfastCalendar.jsx";
import ActivitiesAttendancePage from "./components/Intranet/activitiesAttendance/ActivitiesAttendance.jsx";
import ActivitiesCalendar from "./components/Intranet/calendar/activitiesCalendar.jsx";
import MonitoresTable from "./components/Intranet/monitor-CRUD/monitor.jsx";
import LoginPage from "./pages/loginPage/loginPage.jsx";
import UserForm from "./components/Intranet/user-CRUD/createUser.jsx";


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
    <AuthContextProvider>
      <RecoveryContext.Provider
        value={{ page, setPage, otp, setOTP, email, setEmail }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/centros" element={<Centros />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            {/* <Route path="/intranet" element={<PrivateRoute />}> */}
              <Route path="/intranet" element={<IntranetLayout />}>
                <Route
                  path="calendar/:studentId"
                  element={<BreakfastCalendar />}
                />
                <Route
                  path="calendar/activities/:activitiesStudentId"
                  element={<ActivitiesCalendar />}
                />
                <Route path="breakfast" element={<Breakfast />} />
                <Route
                  path="attendances"
                  element={<ActivitiesAttendancePage />}
                />
                <Route path="users/monitor" element={<MonitoresTable />} />
                <Route path="createuser" element={<UserForm />} />
              </Route>
            {/* </Route> */}
          </Routes>
        </BrowserRouter>
      </RecoveryContext.Provider>
    </AuthContextProvider>
  );
}

export default App;
