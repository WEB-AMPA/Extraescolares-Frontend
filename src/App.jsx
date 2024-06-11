import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/pages/layout/layout-landing";
import LayoutCentros from "./app/pages/layout/layoutCentros";
import AboutUs from "./app/pages/layout/layout-about-us";
import PrivacyPolicy from "./app/pages/privacyPolicy/privacyPolicy";
import Contact from "./app/pages/contact/contact";
import Login from "./app/components/login/login.jsx";
import IntranetLayout from "./app/pages/layout/IntranetLayout";
import OTPInput from "./app/components/login/OTPInput.jsx";
import Recovered from "./app/components/login/Recovered.jsx";
import Reset from "./app/components/login/Reset.jsx";
import { createContext, useState } from "react";
import { AuthContextProvider } from "./app/context/authContext.jsx";
import Students from "./app/components/students/Students.jsx";
import UsersList from "./app/pages/users/users.jsx";
import PrivateRoute from "./app/router/PrivateRoute.jsx";

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
            <Route path="/" element={<Layout />} />
            <Route path="/centros" element={<LayoutCentros />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<NavigateComponents />} />
            <Route path="/intranet" element={<IntranetLayout />}>
              {/* <Route path="/intranet" element={<IntranetLayout />} /> */}
              <Route path="students" element={<Students />} />
              <Route path="users" element={<UsersList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoveryContext.Provider>
    </AuthContextProvider>
  );
}

export default App;
