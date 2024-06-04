import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const ActivityAttendanceTable = ({ onAttendanceAdded }) => {
    const [students, setStudents] = useState([]);
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const responseActivities = await axios.get('http://localhost:3010/api/activities');
                setActivities(responseActivities.data);
                if (responseActivities.data.length > 0) {
                    setSelectedActivity(responseActivities.data[0]._id); // Cambiado a _id
                }
            } catch (error) {
                setError('Error fetching activities. Please try again.');
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    useEffect(() => {
        const fetchStudentsByActivity = async () => {
            try {
                const responseStudents = await axios.get(`http://localhost:3010/api/activitiesStudents/by-activity/${selectedActivity}`);
                const studentsWithAttendance = responseStudents.data.map(student => ({
                    ...student,
                    attendance: 'none'
                }));
                setStudents(studentsWithAttendance);
            } catch (error) {
                setError('Error fetching students. Please try again.');
                console.error('Error fetching students:', error);
            }
        };

        if (selectedActivity) {
            fetchStudentsByActivity();
        }
    }, [selectedActivity]);

    const handleActivityChange = (event) => {
        setSelectedActivity(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleAttendanceChange = (studentId, attendance) => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.student._id === studentId ? { ...student, attendance } : student
            )
        );
    };

    const handleSaveAll = async () => {
        const attendanceRecords = students
            .filter(student => student.attendance !== 'none')
            .map(student => ({
                date: date,
                activities_student: selectedActivity,
                student_id: student.student._id,
                attendance: student.attendance === 'present' ? 1 : 0,
            }));

        if (attendanceRecords.length === 0) {
            setError('No attendance records to save.');
            return;
        }

        try {
            const createdAttendances = [];
            for (const record of attendanceRecords) {
                console.log('Sending record:', record); // Verificación de estructura de datos
                const response = await axios.post('http://localhost:3010/api/register', record);
                createdAttendances.push({ ...record, id: response.data._id });
            }
            onAttendanceAdded(createdAttendances);
            setError('');
        } catch (error) {
            setError('Error saving attendance. Please try again.');
            console.error('Error saving attendance:', error);
        }
    };

    const handleViewMore = (studentId) => {
        navigate(`calendar/activities/${studentId}`);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-end p-6">
                <select 
                    value={selectedActivity}
                    onChange={handleActivityChange}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 mr-4"
                >
                    {activities.map(activity => (
                        <option key={activity._id} value={activity._id}>{activity.name}</option>
                    ))}
                </select>
                <input 
                    type="date" 
                    value={date} 
                    onChange={handleDateChange} 
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                />
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Fecha</th>
                        <th scope="col" className="px-6 py-3">Estudiante</th>
                        <th scope="col" className="px-6 py-3">Asistencia</th>
                        <th scope="col" className="px-6 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr
                            key={`${student.student._id}-${index}`}
                            className={`${
                                index % 2 === 0
                                    ? 'bg-white dark:bg-gray-900'
                                    : 'bg-gray-50 dark:bg-gray-800'
                            } border-b dark:border-gray-700`}
                        >
                            <td className="px-6 py-4">{date}</td>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {student.student.name} {student.student.lastname}
                            </th>
                            <td className="px-6 py-4">
                                <select
                                    value={student.attendance}
                                    onChange={(e) => handleAttendanceChange(student.student._id, e.target.value)}
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                                >
                                    <option value="none">Seleccionar</option>
                                    <option value="present">Sí</option>
                                    <option value="absent">No</option>
                                </select>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => handleViewMore(student.student._id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
                                >
                                    <FaEye className="mr-2" /> Ver más
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedActivity && (
                <div className="flex justify-end p-6">
                    <button
                        onClick={handleSaveAll}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                    >
                        Guardar Todo
                    </button>
                </div>
            )}
            {error && (
                <div className="text-red-500 text-center">
                    {error}
                </div>
            )}
        </div>
    );
};

ActivityAttendanceTable.propTypes = {
    onAttendanceAdded: PropTypes.func.isRequired,
};

export default ActivityAttendanceTable;
