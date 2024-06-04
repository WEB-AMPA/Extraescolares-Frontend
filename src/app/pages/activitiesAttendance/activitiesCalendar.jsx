
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

function ActivitiesCalendar() {
  const { studentId } = useParams();
  const [attendances, setAttendances] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchAttendances = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3010/attendance/${studentId}?startDate=${startDate}&endDate=${endDate}`);
      setAttendances(response.data);
    } catch (error) {
      console.error('Error fetching attendances:', error);
    }
  }, [studentId, startDate, endDate]);

  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const attendance = attendances.find(attendance => {
        const attendanceDate = new Date(attendance.date);
        return (
          attendanceDate.getFullYear() === date.getFullYear() &&
          attendanceDate.getMonth() === date.getMonth() &&
          attendanceDate.getDate() === date.getDate()
        );
      });
      if (attendance) {
        return attendance.attendance === '1' ? <span style={{ color: 'green' }}>●</span> : <span style={{ color: 'red' }}>●</span>;
      }
    }
    return null;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calendario de Asistencia</h1>
      <div className="flex mb-4">
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="mr-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="mr-2"
        />
        <button onClick={fetchAttendances} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Buscar
        </button>
      </div>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={tileContent}
      />
    </div>
  );
}

export default ActivitiesCalendar;
