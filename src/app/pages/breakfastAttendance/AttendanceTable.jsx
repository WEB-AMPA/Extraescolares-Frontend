import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaTrash } from 'react-icons/fa';

const AttendanceTable = ({ onAttendanceAdded }) => {
    const [students, setStudents] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentsAndAttendances = async () => {
            try {
                const responseStudents = await axios.get('http://localhost:3010/api/students/withbreakfast');
                const responseAttendances = await axios.get(`http://localhost:3010/breakfast-attendance/date/${date}`);
                
                const studentsWithAttendance = responseStudents.data.map(student => {
                    const studentAttendance = responseAttendances.data.find(attendance => attendance.student_id._id === student._id);
                    return {
                        ...student,
                        attendance: studentAttendance ? (studentAttendance.attendance === 1 ? 'present' : 'absent') : 'none'
                    };
                });

                setStudents(studentsWithAttendance);
            } catch (error) {
                setError('Error fetching students or attendances. Please try again.');
                console.error('Error fetching students or attendances:', error);
            }
        };

        fetchStudentsAndAttendances();
    }, [date]);

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleAttendanceChange = (studentId, attendance) => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student._id === studentId ? { ...student, attendance } : student
            )
        );
    };

    const handleSaveAll = async () => {
        const attendanceRecords = students
            .filter(student => student.attendance !== 'none')
            .map(student => ({
                date: date,
                student_id: student._id,
                attendance: student.attendance === 'present' ? 1 : 0,
            }));

        console.log('Attendance Records:', attendanceRecords);

        if (attendanceRecords.length === 0) {
            setError('No attendance records to save.');
            return;
        }

        try {
            const createdAttendances = [];
            for (const record of attendanceRecords) {
                const response = await axios.post('http://localhost:3010/breakfast-attendance/', record);
                createdAttendances.push({ ...record, id: response.data._id }); // Guardar el ID de la asistencia
            }
            onAttendanceAdded(createdAttendances);
            setError('');
        } catch (error) {
            setError('Error saving attendance. Please try again.');
            console.error('Error saving attendance:', error);
        }
    };

    // Dentro de handleDelete, usar el ID almacenado en el estado para eliminar la asistencia
const handleDelete = async (attendanceId) => {
    try {
        await axios.delete(`http://localhost:3010/breakfast-attendance/${attendanceId}`);
        // Actualizar la lista de estudiantes después de la eliminación si es necesario
        setStudents((prevStudents) =>
            prevStudents.filter((student) => student.attendanceId !== attendanceId)
        );
    } catch (error) {
        // Manejar errores en caso de que ocurran
        console.error('Error deleting attendance:', error);
    }
};

    const handleViewMore = (studentId) => {
        navigate(`/calendar/${studentId}`);
    };



    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-end p-6">
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
                            key={student._id}
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
                                {student.name} {student.lastname}
                            </th>
                            <td className="px-6 py-4">
                                <select
                                    value={student.attendance}
                                    onChange={(e) => handleAttendanceChange(student._id, e.target.value)}
                                >
                                    <option value="none">Seleccionar</option>
                                    <option value="present">Sí</option>
                                    <option value="absent">No</option>
                                </select>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => handleViewMore(student._id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
                                >
                                    <FaEye className="mr-2" /> Ver más
                                </button>
                                <button
                                    onClick={() => handleDelete(student._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center"
                                >
                                    <FaTrash className="mr-2" /> Eliminar
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end p-6">
                <button
                    onClick={handleSaveAll}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                    Save All
                </button>
            </div>
            {error && (
                <div className="text-red-500 text-center">
                    {error}
                </div>
            )}
        </div>
    );
};

AttendanceTable.propTypes = {
    onAttendanceAdded: PropTypes.func.isRequired,
};

export default AttendanceTable;