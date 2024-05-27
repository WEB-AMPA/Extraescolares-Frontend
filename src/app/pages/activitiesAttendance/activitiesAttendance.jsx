import { useState, useEffect } from 'react';
import axios from 'axios';

function ActivitiesAttendance() {
  const [attendances, setAttendances] = useState([]);
  const [students, setStudents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetchAttendances();
    fetchStudents();
    fetchActivities();
  }, []);

  const fetchAttendances = async () => {
    try {
      const response = await axios.get('http://localhost:3010/attendance');
      setAttendances(response.data);
    } catch (error) {
      console.error('Error fetching attendances:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/activities');
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const handleAttendanceChange = (id, attendance) => {
    setAttendances(prev =>
      prev.map(item => (item._id === id ? { ...item, attendance } : item))
    );
  };

  const handleSave = async () => {
    try {
      for (const attendance of attendances) {
        if (attendance._id) {
          await axios.put(`http://localhost:3010/${attendance._id}`, {
            attendance: attendance.attendance,
            date: new Date(currentDate).toISOString(),
            activities_students: attendance.activities_students
          });
        } else {
          await axios.post('http://localhost:3010/register', {
            attendance: attendance.attendance,
            date: new Date(currentDate).toISOString(),
            activities_students: attendance.activities_students
          });
        }
      }
      alert('Asistencias guardadas exitosamente');
      fetchAttendances();
    } catch (error) {
      console.error('Error saving attendances:', error.response?.data || error.message);
      alert('Hubo un error al guardar las asistencias');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registro de Asistencias</h1>
      <table className="table-auto w-full mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Estudiante</th>
            <th className="px-4 py-2">Actividad</th>
            <th className="px-4 py-2">Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map(attendance => (
            <tr key={attendance._id}>
              <td className="border px-4 py-2">{new Date(currentDate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{attendance.activities_students.student.name}</td>
              <td className="border px-4 py-2">{attendance.activities_students.activity.name}</td>
              <td className="border px-4 py-2">
                <select
                  value={attendance.attendance}
                  onChange={e => handleAttendanceChange(attendance._id, e.target.value)}
                  className="form-select mt-1 block w-full"
                >
                  <option value="0">No</option>
                  <option value="1">Sí</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Guardar Asistencias
      </button>
    </div>
  );
}

export default ActivitiesAttendance;
