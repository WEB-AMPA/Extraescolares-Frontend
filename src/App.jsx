import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./app/pages/landing-page/landingPage";
import AboutUs from "./app/pages/about-us/about-us";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;