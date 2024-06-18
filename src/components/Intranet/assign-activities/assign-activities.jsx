import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../context/authContext';

const AssignActivity = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState({});
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { VITE_URL } = import.meta.env;
  const { auth } = useAuthContext();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`${VITE_URL}/api/students/${studentId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (!response.ok) throw new Error('Error fetching student data');
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setErrorMessage('Error fetching student data');
      }
    };

    const fetchActivities = async () => {
      try {
        const response = await fetch(`${VITE_URL}/api/activities`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (!response.ok) throw new Error('Error fetching activities');
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setErrorMessage('Error fetching activities');
      }
    };

    fetchStudent();
    fetchActivities();
  }, [studentId, auth.token, VITE_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedActivityData = activities.find(activity => activity._id === selectedActivity);

      const response = await fetch(`${VITE_URL}/api/activities/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          studentId,
          activityId: selectedActivity,
          categoryName: selectedActivityData.categories[0].name,
          scheduleDay: selectedActivityData.scheduleDay[0].days,
          scheduleHour: selectedActivityData.scheduleHour[0].range,
          centerName: selectedActivityData.centers[0].name,
        }),
      });

      if (!response.ok) {
        throw new Error('Error asignando actividad');
      }

      alert('Actividad asignada correctamente');
      setSelectedActivity(''); // Limpiar el estado después de la asignación exitosa
      setErrorMessage('');
    } catch (error) {
      console.error('Error asignando actividad:', error);
      setErrorMessage('Error al asignar actividad');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Asignar Actividad a {student.name} {student.lastname}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="activity" className="block text-sm font-medium text-gray-700">Actividad</label>
          <select
            id="activity"
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Selecciona una actividad</option>
            {activities.map((activity) => (
              <option key={activity._id} value={activity._id}>
                {`${activity.name} - ${activity.categories.map(c => c.name).join(', ')} - ${activity.scheduleDay.map(d => d.days).join(', ')} - ${activity.scheduleHour.map(h => h.range).join(', ')} - ${activity.centers.map(c => c.name).join(', ')}`}
              </option>
            ))}
          </select>
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-900 text-white rounded">
            Asignar Actividad
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignActivity;
