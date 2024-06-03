// Importa useState y useEffect
import { useState, useEffect } from 'react';

const Attendance = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null); // Nuevo estado para mantener la asignación seleccionada
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('http://localhost:3010/api/activitiesStudents');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, []);

  const handleActivityChange = (e) => {
    const activityId = e.target.value;
    setSelectedActivity(activityId);
    const filteredAssignment = assignments.find(
      (assignment) => assignment.activity._id === activityId
    );
    setSelectedAssignment(filteredAssignment); // Establece la asignación seleccionada
  };

  const handleAttendanceChange = (e) => {
    const attendance = e.target.value;
    setSelectedAssignment(prevAssignment => ({ ...prevAssignment, attendance }));
  };

  const handleSaveAttendance = async () => {
    if (!selectedActivity) {
      console.error('Por favor seleccione una actividad.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3010/registerAttendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date,
          activity_student: selectedAssignment.activity_student, // Usa el ID de la asignación seleccionada
          attendance: selectedAssignment.attendance === 'true' ? 1 : 0 
        })
      });
      if (!response.ok) {
        throw new Error('Error al registrar la asistencia.');
      }
      alert('Asistencia registrada exitosamente.');
    } catch (error) {
      alert ('Error registering attendance:', error);
    }
  };

  return (
    <div>
      <h1>Registrar Asistencia</h1>
      <div>
        <label>Selecciona una actividad:</label>
        <select
          value={selectedActivity}
          onChange={handleActivityChange}
          required
        >
          <option value="">Seleccione una actividad</option>
          {assignments.map((assignment) => (
            <option key={assignment.activity._id} value={assignment.activity._id}>
              {assignment.activity.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Fecha:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button onClick={handleSaveAttendance}>Guardar</button>

      {selectedAssignment && (
        <div>
          <h2>Tabla de Asistencias</h2>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Actividad</th>
                <th>Nombre</th>
                <th>Asistencia</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{date}</td>
                <td>{selectedAssignment.activity.name}</td>
                <td>{selectedAssignment.student.name}</td>
                <td>
                  <select
                    value={selectedAssignment.attendance || 'true'}
                    onChange={handleAttendanceChange}
                    required
                  >
                    <option value="true">Asistió</option>
                    <option value="false">No asistió</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Attendance;


