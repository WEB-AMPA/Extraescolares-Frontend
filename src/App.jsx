import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/pages/layout/layout-landing";
import LayoutCentros from "./app/pages/layout/layoutCentros";
import AboutUs from "./app/pages/layout/layout-about-us";
import Activities from "./app/pages/layout/layout-activities";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/centros" element={<LayoutCentros />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/activities" element={<Activities/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;