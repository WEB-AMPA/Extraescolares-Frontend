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
import LoginPage from "./pages/loginPage/loginPage";
import PrivateRoute from "./routes/PrivateRoute.jsx";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/intranet" element={<PrivateRoute><IntranetLayout /></PrivateRoute>}>
            <Route path="breakfast" element={<Breakfast />} />
            {/* Otras rutas dentro de Intranet */}
          </Route>
          <Route path="/centros" element={<Centros />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
