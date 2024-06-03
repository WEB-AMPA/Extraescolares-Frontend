import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/pages/layout/layout-landing";
import LayoutCentros from "./app/pages/layout/layoutCentros";
import AboutUs from "./app/pages/layout/layout-about-us";
import PrivacyPolicy from "./app/pages/privacyPolicy/privacyPolicy"
// import IntranetLayout from "./app/pages/layout/IntranetLayout";

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Layout />} />
        {/* <Route path="/intranet" element={<IntranetLayout />} /> */}
        <Route path="/centros" element={<LayoutCentros />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;