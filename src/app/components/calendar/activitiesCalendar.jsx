import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ActivitiesCalendar = () => {
    const { studentId } = useParams();
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [error, setError] = useState('');
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);

    useEffect(() => {
        const fetchAttendanceHistory = async () => {
            try {
                const startDate = dateRange[0].toISOString().split('T')[0];
                const endDate = dateRange[1].toISOString().split('T')[0];

                const response = await axios.get(`http://localhost:3010/api/attendance/calendar/student/${studentId}/${startDate}/${endDate}`);
                setAttendanceHistory(response.data);
            } catch (error) {
                setError('Error fetching attendance history');
                console.error('Error fetching attendance history:', error.response || error.message || error);
            }
        };

        fetchAttendanceHistory();
    }, [studentId, dateRange]);

    const handleDateChange = (range) => {
        setDateRange(range);
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().split('T')[0];
            const attendance = attendanceHistory.find(record => new Date(record.date).toISOString().split('T')[0] === formattedDate);
            
            if (attendance) {
                if (attendance.attendance === 1) {
                    return <div className="flex items-center justify-center h-full w-full"><div className="bg-green-400 rounded-full h-6 w-6"></div></div>;
                } else {
                    return <div className="flex items-center justify-center h-full w-full"><div className="bg-red-400 rounded-full h-6 w-6"></div></div>;
                }
            }
        }
        return null;
    };
    
    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Historial de Asistencias</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div>
                <Calendar
                    selectRange={true}
                    onChange={handleDateChange}
                    value={dateRange}
                    tileContent={tileContent}
                />
            </div>
        </div>
    );
};

export default ActivitiesCalendar;
