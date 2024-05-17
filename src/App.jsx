import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/pages/layout/layout";
import Sidebar from "./app/components/sidebar/sidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/sidebar" element={<Sidebar/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
