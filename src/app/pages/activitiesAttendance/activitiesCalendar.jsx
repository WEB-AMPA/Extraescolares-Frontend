import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const ActivitiesCalendar = ({ activityId }) => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/api/attendance/${activityId}`);
        setAttendanceData(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, [activityId]);

  return (
    <div>
      <h1>Attendance Calendar</h1>
      <Calendar
        localizer={localizer}
        events={attendanceData.map(attendance => ({
          title: attendance.student.name,
          start: new Date(attendance.date),
          end: new Date(attendance.date),
          resource: attendance.attendance === 1 ? 'green' : 'red', // Color según la asistencia
        }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default ActivitiesCalendar;
