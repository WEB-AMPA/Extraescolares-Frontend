import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/pages/layout/layout";
import LayoutCentros from "./app/pages/layout/layoutCentros";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/centros" element={<LayoutCentros />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;