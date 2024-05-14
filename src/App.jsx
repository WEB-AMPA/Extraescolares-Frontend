import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./app/pages/landing-page/landingPage";
import LoginPage from "./app/components/login/login";
import ContactFrom from "./app/components/login/contactForm.jsx";
import ForgotPassword from "./app/components/login/forgotPassword.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contactForm" element={<ContactFrom />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
