import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../context/authContext';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [monitors, setMonitors] = useState([]);
  const [centers, setCenters] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [days, setDays] = useState([]);
  const { VITE_URL } = import.meta.env;
  const { auth } = useAuthContext();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${VITE_URL}/api/activities`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.token}`,
          },
        });
        if (!response.ok) throw new Error('Error fetching activities');
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    const fetchOptions = async () => {
      try {
        const [monitorsResponse, centersResponse, schedulesResponse, daysResponse] = await Promise.all([
          fetch(`${VITE_URL}/api/users/role/monitor`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${auth.token}`,
            },
          }),
          fetch(`${VITE_URL}/api/centers`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${auth.token}`,
            },
          }),
          fetch(`${VITE_URL}/api/scheduleHours`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${auth.token}`,
            },
          }),
          fetch(`${VITE_URL}/api/schedulesDays`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${auth.token}`,
            },
          })
        ]);

        const [monitorsData, centersData, schedulesData, daysData] = await Promise.all([
          monitorsResponse.json(),
          centersResponse.json(),
          schedulesResponse.json(),
          daysResponse.json()
        ]);

        setMonitors(monitorsData);
        setCenters(centersData);
        setSchedules(schedulesData);
        setDays(daysData);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchActivities();
    fetchOptions();
  }, []);

  const handleEdit = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const handleDelete = async (activityId) => {
    try {
      const response = await fetch(`${VITE_URL}/api/activities/${activityId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) throw new Error('Error deleting activity');
      setActivities(activities.filter(activity => activity._id !== activityId));
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveActivity = async () => {
    try {
      const response = await fetch(`${VITE_URL}/api/activities/${selectedActivity._id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`,
        },
        body: JSON.stringify(selectedActivity),
      });
      if (!response.ok) throw new Error('Error updating activity');
      const updatedActivity = await response.json();
      setActivities(activities.map(activity => activity._id === updatedActivity._id ? updatedActivity : activity));
      closeModal();
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  return (
    <div className="flex justify-center overflow-x-auto m-4 p-4">
      <table className="divide-y divide-gray-600 border border-gray-300 rounded-lg">
        <thead className="bg-gray-200 gap-3 items-center">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Actividad</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Categoría</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Monitor</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Centro</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Horario</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Días</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Ajustes</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activities.length === 0 ? (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">No hay actividades disponibles.</td>
            </tr>
          ) : (
            activities.map((activity) => (
              <tr key={activity._id} className="border-b border-gray-300">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{activity?.name || 'Nombre no disponible'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{activity?.categories?.map(category => category.name).join(', ') || 'Categoría no disponible'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{activity?.monitor?.name || 'Monitor no disponible'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{activity?.centers?.map(center => center.name).join(', ') || 'Centro no disponible'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{activity?.scheduleHour?.map(hour => hour.range).join(', ') || 'Horario no disponible'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{activity?.scheduleDay?.map(day => day.days).join(', ') || 'Días no disponibles'}</div>
                </td>
                <td className="flex px-6 py-3 text-center text-sm font-medium">
                  <button title="Editar Actividad" onClick={() => handleEdit(activity)} className="text-white p-2 m-2 bg-blue-800 rounded">
                    <FaEdit />
                  </button>
                  <button title="Eliminar Actividad" onClick={() => handleDelete(activity._id)} className="text-white p-2 m-2 bg-red-700 rounded">
                    <MdDelete />
                  </button>
                  <Link to={`/intranet/actividades/${activity._id}`} className="p-2 m-2 bg-yellow-300 rounded flex items-center justify-center" title="Ver Detalles de la Actividad">
                    <CiViewList />
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <form className="p-8 border border-black rounded">
                  <h3 className="mb-5 text-xl text-center leading-6 font-medium text-gray-400">Editar Actividad</h3>
                  <div className="mb-4">
                    <label htmlFor="activityName" className="block text-sm font-medium text-gray-700 m-2">Nombre de la Actividad:</label>
                    <input
                      type="text"
                      name="activityName"
                      id="activityName"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedActivity?.name || ''}
                      onChange={(e) => setSelectedActivity({ ...selectedActivity, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="activityMonitor" className="block text-sm font-medium text-gray-700 m-2">Monitor:</label>
                    <select
                      id="activityMonitor"
                      name="activityMonitor"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedActivity?.monitor?._id || ''}
                      onChange={(e) => setSelectedActivity({ ...selectedActivity, monitor: monitors.find(monitor => monitor._id === e.target.value) })}
                    >
                      <option value="">Seleccione un monitor</option>
                      {monitors.map(monitor => (
                        <option key={monitor._id} value={monitor._id}>{monitor.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="activityCenter" className="block text-sm font-medium text-gray-700 m-2">Centro:</label>
                    <select
                      id="activityCenter"
                      name="activityCenter"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedActivity?.centers?.[0]?._id || ''}
                      onChange={(e) => setSelectedActivity({ ...selectedActivity, centers: [centers.find(center => center._id === e.target.value)] })}
                    >
                      <option value="">Seleccione un centro</option>
                      {centers.map(center => (
                        <option key={center._id} value={center._id}>{center.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="activitySchedule" className="block text-sm font-medium text-gray-700 m-2">Horario:</label>
                    <select
                      id="activitySchedule"
                      name="activitySchedule"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedActivity?.scheduleHour?.[0]?._id || ''}
                      onChange={(e) => setSelectedActivity({ ...selectedActivity, scheduleHour: [schedules.find(schedule => schedule._id === e.target.value)] })}
                    >
                      <option value="">Seleccione un horario</option>
                      {schedules.map(schedule => (
                        <option key={schedule._id} value={schedule._id}>{schedule.range}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="activityDay" className="block text-sm font-medium text-gray-700 m-2">Días:</label>
                    <select
                      id="activityDay"
                      name="activityDay"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={selectedActivity?.scheduleDay?.[0]?._id || ''}
                      onChange={(e) => setSelectedActivity({ ...selectedActivity, scheduleDay: [days.find(day => day._id === e.target.value)] })}
                    >
                      <option value="">Seleccione un día</option>
                      {days.map(day => (
                        <option key={day._id} value={day._id}>{day.days}</option>
                      ))}
                    </select>
                  </div>
                  {/* Add more fields here as necessary */}
                  <div className="mt-9 justify-center bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={saveActivity}>
                      Guardar Cambios
                    </button>
                    <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={closeModal}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
