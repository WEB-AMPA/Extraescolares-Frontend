import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/pages/layout/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
