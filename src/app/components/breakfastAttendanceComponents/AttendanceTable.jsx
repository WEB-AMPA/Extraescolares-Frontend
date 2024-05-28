import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AttendanceTable = ({ onAttendanceAdded }) => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3010/api/students/withbreakfast');
                console.log('Students with breakfast:', response.data);
                const studentsWithAttendance = response.data.map(student => ({
                    ...student,
                    attendance: 'none', // Initial attendance state
                }));
                setStudents(studentsWithAttendance);
            } catch (error) {
                setError('Error fetching students. Please try again.');
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleAttendanceChange = (studentId, attendance) => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === studentId ? { ...student, attendance } : student
            )
        );
    };

    const handleSaveAll = async () => {
        const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        const attendanceRecords = students
            .filter(student => student.attendance !== 'none')
            .map(student => ({
                date,
                student_id: student._id,
                attendance: student.attendance === 'present' ? 1 : 0,
            }));
    
        console.log('Attendance Records:', attendanceRecords); // Log the attendance records before sending the request
    
        if (attendanceRecords.length === 0) {
            setError('No attendance records to save.');
            return;
        }
    
        try {
            await axios.post('http://localhost:3010/register/breakfast-attendance/', attendanceRecords);
            onAttendanceAdded(attendanceRecords);
            setError(''); // Clear error message after successful save
        } catch (error) {
            setError('Error saving attendance. Please try again.');
            console.error('Error saving attendance:', error);
        }
    };
    
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Student</th>
                        <th scope="col" className="px-6 py-3">Attendance</th>
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
                            <td className="px-6 py-4">{new Date().toISOString().split('T')[0]}</td>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {student.name} {student.lastname}
                            </th>
                            <td className="px-6 py-4">
                                <select
                                    value={student.attendance}
                                    onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="none">Select</option>
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            <div className="flex justify-end p-6">
                <button
                    onClick={handleSaveAll}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Save All
                </button>
            </div>
        </div>
    );
};

AttendanceTable.propTypes = {
    onAttendanceAdded: PropTypes.func.isRequired,
};

export default AttendanceTable;
