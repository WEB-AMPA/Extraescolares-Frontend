import { useState, useEffect } from 'react';
import axios from 'axios';

function ActivitiesAttendance() {
  const [attendances, setAttendances] = useState([]);
  const [originalAttendance, setOriginalAttendance] = useState({});
  const [pendingChanges, setPendingChanges] = useState({});

  useEffect(() => {
    fetchAttendances();
    fetchOriginalAttendance();
  }, []);

  const fetchAttendances = async () => {
    try {
      const response = await axios.get('http://localhost:3010/attendance');
      setAttendances(response.data);
    } catch (error) {
      console.error('Error fetching attendances:', error);
    }
  };

  const fetchOriginalAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:3010/attendance');
      const originalData = response.data.reduce((acc, cur) => {
        acc[cur._id] = cur.attendance;
        return acc;
      }, {});
      setOriginalAttendance(originalData);
    } catch (error) {
      console.error('Error fetching original attendance:', error);
    }
  };

  const handleAttendanceChange = (id, attendance) => {
    setPendingChanges(prevChanges => ({
      ...prevChanges,
      [id]: attendance
    }));
  };

  const handleSave = async () => {
    try {
      const changedAttendances = Object.entries(pendingChanges)
        .filter(([id, attendance]) => originalAttendance[id] !== attendance)
        .map(([id, attendance]) => ({ id, attendance }));

      await Promise.all(
        changedAttendances.map(({ id, attendance }) =>
          axios.put(`http://localhost:3010/attendance/${id}`, {
            attendance
          })
        )
      );
      alert('Asistencias guardadas exitosamente');
      setPendingChanges({});
    } catch (error) {
      console.error('Error saving attendances:', error);
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
              <td className="border px-4 py-2">{new Date(attendance.date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{attendance.activities_students.student.name}</td>
              <td className="border px-4 py-2">{attendance.activities_students.activity.name}</td>
              <td className="border px-4 py-2">
                <select
                  value={pendingChanges[attendance._id] || originalAttendance[attendance._id]}
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
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
        Guardar Asistencias
      </button>
    </div>
  );
}

export default ActivitiesAttendance;
