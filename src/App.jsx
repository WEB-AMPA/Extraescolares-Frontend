import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/pages/layout/layout";
import LayoutCentros from "./app/pages/layout/layoutCentros";
import ActivitiesAttendance from "./app/pages/activitiesAttendance/activitiesAttendance";
import Activities from "./app/pages/activities/activities";
import CalendarPage from "./app/pages/activitiesCalendar/activitiesCalendar";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/centros" element={<LayoutCentros />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/attendances" element={<ActivitiesAttendance />} />
        <Route path="/calendar/:studentId" element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
