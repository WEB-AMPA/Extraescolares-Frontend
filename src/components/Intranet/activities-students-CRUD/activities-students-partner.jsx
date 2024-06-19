import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../context/authContext';

const ActivitiesStudentPartner = () => {
  const { studentId } = useParams();
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [student, setStudent] = useState({});
  const [availableActivities, setAvailableActivities] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [assignSuccess, setAssignSuccess] = useState(false); // Estado para manejar la confirmación de asignación exitosa
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeAssignModal = () => {
    setIsAssignModalOpen(false);
    setSelectedActivityId('');
    setAssignSuccess(false); // Resetear el estado de confirmación al cerrar el modal
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

  return (
    <div className="flex flex-col justify-center overflow-x-auto m-4 p-4">
      <h2 className="text-2xl font-semibold mb-4">Actividades del Estudiante</h2>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">Actividad y Categoría</th>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">Monitor</th>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">Horario</th>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">Observaciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activities.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No hay actividades para este estudiante.</td>
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
              </tr>
            ))
          )}
        </tbody>
      </table>

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

export default ActivitiesStudentPartner;
