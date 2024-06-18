import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarCustom.css'; // Importa el archivo CSS personalizado
import { useAuthContext } from '../../../context/authContext';

const ActivitiesCalendar = () => {
    const { activitiesStudentId } = useParams();
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [error, setError] = useState('');
    const { VITE_URL } = import.meta.env;
    const { auth } = useAuthContext();

    // Función para obtener el rango de fechas del mes actual
    const getCurrentMonthRange = () => {
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        return [startOfMonth, endOfMonth];
    };

    const [dateRange, setDateRange] = useState(getCurrentMonthRange);

    const fetchAttendanceHistory = useCallback(async () => {
        try {
            const timezoneOffset = new Date().getTimezoneOffset() * 60000; // Desplazamiento de la zona horaria en milisegundos
            const start_date = new Date(dateRange[0].getTime() - timezoneOffset).toISOString().split('T')[0];
            const end_date = new Date(dateRange[1].getTime() - timezoneOffset).toISOString().split('T')[0];

            const response = await axios.get(
                `${VITE_URL}/api/attendance/activities_student/${activitiesStudentId}/date-range/${start_date}/${end_date}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.token}`,
                    },
                }
            );
            if (response.data.attendances.length > 0) {
                setStudentName(response.data.studentName);
            } else {
                setStudentName(""); 
            }
            console.log(studentName);
            setAttendanceHistory(response.data.attendances);
        } catch (error) {
            setError('Error fetching attendance history');
            console.error('Error fetching attendance history:', error.response || error.message || error);
        }
    }, [activitiesStudentId, dateRange, VITE_URL, auth.token]);

    useEffect(() => {
        fetchAttendanceHistory();
    }, [fetchAttendanceHistory]);

    const handleDateChange = (range) => {
        setDateRange(range);
    };

    const handleActiveStartDateChange = ({ activeStartDate }) => {
        const startOfMonth = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth(), 1);
        const endOfMonth = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 0);
        setDateRange([startOfMonth, endOfMonth]);
    };

    const tileContent = useCallback(({ date, view }) => {
        if (view === 'month') {
            const timezoneOffset = date.getTimezoneOffset() * 60000;
            const formattedDate = new Date(date.getTime() - timezoneOffset).toISOString().split('T')[0];
            const attendance = attendanceHistory.find(record => {
                const recordDate = new Date(record.date);
                const recordDateFormatted = new Date(recordDate.getTime() - recordDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
                return recordDateFormatted === formattedDate;
            });

            if (attendance) {
                if (attendance.attendance === 1) {
                    return <div className="flex items-center justify-center h-full w-full"><div className="bg-green-400 rounded-full h-6 w-6"></div></div>;
                } else {
                    return <div className="flex items-center justify-center h-full w-full"><div className="bg-red-400 rounded-full h-6 w-6"></div></div>;
                }
            }
        }
        return null;
    }, [attendanceHistory]);

    return (
        <div className="flex flex-col items-center mt-10">
            <h2 className="text-2xl font-bold mb-4">Historial de Asistencias</h2>
            {error && <p className="text-red-500">{error}</p>}
            <p className="text-lg font-semibold mb-4">Alumna: {studentName}</p>
            <div>
                <Calendar
                    className="custom-calendar"
                    selectRange={true}
                    onChange={handleDateChange}
                    value={dateRange}
                    tileContent={tileContent}
                    onActiveStartDateChange={handleActiveStartDateChange}
                />
            </div>
            <Link to={`/intranet/attendances/`} className="mt-4 underline font-semibold text-lg">
                Volver a la lista de asistencia
            </Link>
        </div>
    );
};

export default ActivitiesCalendar;
