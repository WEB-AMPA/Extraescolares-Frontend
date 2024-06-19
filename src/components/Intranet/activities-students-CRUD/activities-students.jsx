import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { useAuthContext } from '../../../context/authContext';

const ActivitiesStudent = () => {
  const { studentId } = useParams();
  const [activities, setActivities] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [student, setStudent] = useState({});
  const [availableActivities, setAvailableActivities] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [assignSuccess, setAssignSuccess] = useState(false); 
  const { VITE_URL } = import.meta.env;
  const { auth } = useAuthContext();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const url = studentId 
          ? `${VITE_URL}/api/activitiesStudents?studentId=${studentId}`
          : `${VITE_URL}/api/activitiesStudents`;

        const response = await fetch(url, {
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
      }
    };

    const fetchStudentAndAvailableActivities = async () => {
      try {
        const [studentResponse, activitiesResponse] = await Promise.all([
          fetch(`${VITE_URL}/api/students/${studentId}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.token}`,
            },
          }),
          fetch(`${VITE_URL}/api/activities`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.token}`,
            },
          })
        ]);

        if (!studentResponse.ok) throw new Error('Error fetching student data');
        if (!activitiesResponse.ok) throw new Error('Error fetching activities');

        const studentData = await studentResponse.json();
        const activitiesData = await activitiesResponse.json();

        setStudent(studentData);
        setAvailableActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching student and activities data:', error);
        setErrorMessage('Error fetching data');
      }
    };

    fetchActivities();
    fetchStudentAndAvailableActivities();
  }, [studentId, VITE_URL, auth.token]);

  const handleDelete = (activity) => {
    setSelectedActivity(activity);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };


  const closeAssignModal = () => {
    setIsAssignModalOpen(false);
    setSelectedActivityId('');
    setAssignSuccess(false); 
  };

  const deleteActivity = async () => {
    try {
      const response = await fetch(`${VITE_URL}/api/activitiesStudents/${selectedActivity._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error deleting activity');
      }

      setActivities(activities.filter(activity => activity._id !== selectedActivity._id));
      closeConfirmModal();
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const assignActivity = async (e) => {
    e.preventDefault();
    try {
      const selectedActivityData = availableActivities.find(activity => activity._id === selectedActivityId);

      const response = await fetch(`${VITE_URL}/api/activities/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          studentId,
          activityId: selectedActivityId,
          categoryName: selectedActivityData.categories[0].name,
          scheduleDay: selectedActivityData.scheduleDay[0].days,
          scheduleHour: selectedActivityData.scheduleHour[0].range,
          centerName: selectedActivityData.centers[0].name,
        }),
      });

      if (!response.ok) {
        throw new Error('Error asignando actividad');
      }

      setAssignSuccess(true); 
      setErrorMessage('');
      setSelectedActivityId('');
    } catch (error) {
      console.error('Error asignando actividad:', error);
      setErrorMessage('Error al asignar actividad');
    }
  };

  return (
    <div className="flex flex-col justify-center overflow-x-auto m-4 p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Actividades del Estudiante</h2>
        <button
          onClick={() => setIsAssignModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-full"
        >
          Asignar Actividad
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">Actividad y Categoría</th>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">Monitor</th>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">Horario</th>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">Observaciones</th>
            <th scope="col" className="px-4 py-3 text-center text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activities.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No hay actividades para este estudiante.</td>
            </tr>
          ) : (
            activities.map((activity) => (
              <tr key={activity._id} className="border-b border-gray-300 hover:bg-gray-100 transition duration-200">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-m text-gray-900">{activity?.activity?.name || 'Nombre no disponible'}</div>
                  <div className="text-sm text-gray-500">{activity?.activity?.categories?.[0]?.name || 'Categoría no disponible'}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-m text-gray-900">{activity?.activity?.monitor?.name || 'Monitor no disponible'}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-m text-gray-900">
                    {activity?.activity?.scheduleDay?.[0]?.days || 'Días no disponibles'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {activity?.activity?.scheduleHour?.[0]?.range || 'Horario no disponible'}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-m text-gray-900">{activity?.activity?.observations || 'Observaciones no disponibles'}</div>
                </td>
                <td className="flex justify-center items-center">
                  <button
                    title="Eliminar Actividad"
                    onClick={() => handleDelete(activity)}
                    className="text-white bg-red-600 rounded-lg p-2 flex flex-col items-center w-20 sm:w-auto transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <MdDelete className="w-5 h-5 mb-1" />
                    <span className="text-xs font-light">Eliminar</span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isAssignModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10 shadow-lg w-full max-w-4xl mx-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Asignar Actividad a {student.name} {student.lastname}</h2>
            <form onSubmit={assignActivity} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block mb-2 font-medium">Actividad</label>
                <select
                  value={selectedActivityId}
                  onChange={(e) => setSelectedActivityId(e.target.value)}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Selecciona una actividad</option>
                  {availableActivities.map((activity) => (
                    <option key={activity._id} value={activity._id}>
                      {`${activity.name} - ${activity.categories.map(c => c.name).join(', ')} - ${activity.scheduleDay.map(d => d.days).join(', ')} - ${activity.scheduleHour.map(h => h.range).join(', ')} - ${activity.centers.map(c => c.name).join(', ')}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 flex justify-end mt-4">
                <button
                  type="button"
                  onClick={closeAssignModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full mr-4 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Asignar
                </button>
              </div>
              {assignSuccess && <p className="text-green-500 col-span-2 text-center mt-4">Actividad asignada correctamente</p>}
              {errorMessage && <p className="text-red-500 col-span-2 text-center mt-4">{errorMessage}</p>}
            </form>
          </div>
        </div>
      )}

      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10 shadow-lg w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
            <p className="mb-4">¿Estás seguro de que deseas eliminar esta actividad?</p>
            <div className="flex justify-end">
              <button
                onClick={closeConfirmModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full mr-4"
              >
                Cancelar
              </button>
              <button
                onClick={deleteActivity}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitiesStudent;

