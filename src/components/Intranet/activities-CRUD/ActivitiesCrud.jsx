import { useState, useEffect } from 'react';
import { FaEdit, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAuthContext } from '../../../context/authContext';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [monitors, setMonitors] = useState([]);
  const [centers, setCenters] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [days, setDays] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Change this value to set items per page

  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);
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
        const [monitorsResponse, centersResponse, schedulesResponse, daysResponse, categoriesResponse] = await Promise.all([
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
          fetch(`${VITE_URL}/api/scheduleDays`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${auth.token}`,
            },
          }),
          fetch(`${VITE_URL}/api/categories`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${auth.token}`,
            },
          })
        ]);

        if (!monitorsResponse.ok) throw new Error(`Error fetching monitors: ${monitorsResponse.statusText}`);
        if (!centersResponse.ok) throw new Error(`Error fetching centers: ${centersResponse.statusText}`);
        if (!schedulesResponse.ok) throw new Error(`Error fetching schedules: ${schedulesResponse.statusText}`);
        if (!daysResponse.ok) throw new Error(`Error fetching days: ${daysResponse.statusText}`);
        if (!categoriesResponse.ok) throw new Error(`Error fetching categories: ${categoriesResponse.statusText}`);

        const [monitorsData, centersData, schedulesData, daysData, categoriesData] = await Promise.all([
          monitorsResponse.json(),
          centersResponse.json(),
          schedulesResponse.json(),
          daysResponse.json(),
          categoriesResponse.json()
        ]);

        setMonitors(monitorsData);
        setCenters(centersData);
        setSchedules(schedulesData);
        setDays(daysData);
        setCategories(categoriesData);
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

  const openDeleteModal = (activityId) => {
    setActivityToDelete(activityId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setActivityToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${VITE_URL}/api/activities/${activityToDelete}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) throw new Error('Error deleting activity');
      setActivities(activities.filter(activity => activity._id !== activityToDelete));
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const saveActivity = async () => {
    try {
      const activityData = {
        name: selectedActivity.name,
        monitorUsername: selectedActivity.monitor?._id || selectedActivity.monitor?.username,
        categoryNames: selectedActivity.categories?.map(category => category.name),
        scheduleDays: selectedActivity.scheduleDay?.map(day => day.days),
        scheduleHours: selectedActivity.scheduleHour?.map(hour => hour.range),
        centerNames: selectedActivity.centers?.map(center => center.name),
      };

      const response = await fetch(`${VITE_URL}/api/activities/${selectedActivity._id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`,
        },
        body: JSON.stringify(activityData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error updating activity:', errorText);
        throw new Error(`Error updating activity: ${response.status} - ${errorText}`);
      }

      const updatedActivity = await response.json();
      console.log('updatedActivity:', updatedActivity);

      setActivities(activities.map(activity => activity._id === updatedActivity._id ? updatedActivity : activity));
      closeModal();
    } catch (error) {
      console.error('Error updating activity:', error.message);
    }
  };

  const filteredActivities = activities.filter(activity =>
    `${activity.name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreviousPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage < Math.ceil(filteredActivities.length / itemsPerPage) ? currentPage + 1 : currentPage);
  };

  const indexOfLastActivity = currentPage * itemsPerPage;
  const indexOfFirstActivity = indexOfLastActivity - itemsPerPage;
  const currentActivities = filteredActivities.slice(indexOfFirstActivity, indexOfLastActivity);

  return (
    <div className="flex flex-col justify-center overflow-x-auto m-4 p-4">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar por Nombre y Apellidos..."
          value={searchTerm}
          onChange={handleSearch}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          style={{ maxWidth: '300px' }}
        />
        <button
          onClick={() => window.location.href = '/intranet/createactivity'}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Actividad
        </button>
      </div>
      <table className="divide-y divide-gray-600 border border-gray-300 rounded-lg">
        <thead className="bg-gray-200 gap-3 items-center">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Actividad</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Categoría</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Monitor</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Centro</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Horario</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentActivities.map((activity) => (
            <tr key={activity._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-300">{activity.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-300">{activity.categories.map(category => category.name).join(', ')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-300">{activity.monitor?.username || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-300">{activity.centers.map(center => center.name).join(', ')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-300">{activity.scheduleDay?.map(day => day.days).join(', ')} {activity.scheduleHour?.map(hour => hour.range).join(', ')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border-b border-gray-300">
                <button onClick={() => handleEdit(activity)} className="text-white p-2 m-2 bg-blue-800 rounded"><FaEdit /></button>
                <button onClick={() => openDeleteModal(activity._id)} className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-2 rounded"><MdDelete /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button onClick={handlePreviousPage} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          <FaArrowLeft className="mr-2" />
          Anterior
        </button>
        <button onClick={handleNextPage} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          Siguiente
          <FaArrowRight className="ml-2" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10">
            <h2 className="text-2xl font-bold mb-4">Editar Actividad</h2>
            <form>
              <label className="block mb-2">Nombre:</label>
              <input
                type="text"
                value={selectedActivity.name}
                onChange={(e) => setSelectedActivity({ ...selectedActivity, name: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              />
              <label className="block mb-2">Monitor:</label>
              <select
                value={selectedActivity.monitor?._id || selectedActivity.monitor?.username}
                onChange={(e) => setSelectedActivity({
                  ...selectedActivity,
                  monitor: monitors.find((monitor) => monitor._id === e.target.value)
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              >
                {monitors.map((monitor) => (
                  <option key={monitor._id} value={monitor._id}>{monitor.username}</option>
                ))}
              </select>
              <label className="block mb-2">Categorías:</label>
              <select
                multiple
                value={selectedActivity.categories?.map((category) => category._id)}
                onChange={(e) => setSelectedActivity({
                  ...selectedActivity,
                  categories: Array.from(e.target.selectedOptions, (option) => categories.find((category) => category._id === option.value))
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
              <label className="block mb-2">Días de Horario:</label>
              <select
                multiple
                value={selectedActivity.scheduleDay?.map((day) => day._id)}
                onChange={(e) => setSelectedActivity({
                  ...selectedActivity,
                  scheduleDay: Array.from(e.target.selectedOptions, (option) => days.find((day) => day._id === option.value))
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              >
                {days.map((day) => (
                  <option key={day._id} value={day._id}>{day.days}</option>
                ))}
              </select>
              <label className="block mb-2">Horas de Horario:</label>
              <select
                multiple
                value={selectedActivity.scheduleHour?.map((hour) => hour._id)}
                onChange={(e) => setSelectedActivity({
                  ...selectedActivity,
                  scheduleHour: Array.from(e.target.selectedOptions, (option) => schedules.find((hour) => hour._id === option.value))
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              >
                {schedules.map((hour) => (
                  <option key={hour._id} value={hour._id}>{hour.range}</option>
                ))}
              </select>
              <label className="block mb-2">Centros:</label>
              <select
                multiple
                value={selectedActivity.centers?.map((center) => center._id)}
                onChange={(e) => setSelectedActivity({
                  ...selectedActivity,
                  centers: Array.from(e.target.selectedOptions, (option) => centers.find((center) => center._id === option.value))
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              >
                {centers.map((center) => (
                  <option key={center._id} value={center._id}>{center.name}</option>
                ))}
              </select>
            </form>
            <div className="flex justify-end">
              <button onClick={closeModal} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">Cancelar</button>
              <button onClick={saveActivity} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10">
            <h2 className="text-2xl font-bold mb-4">Confirmar Eliminación</h2>
            <p className="mb-4">¿Estás seguro de que deseas eliminar esta actividad?</p>
            <div className="flex justify-end">
              <button onClick={closeDeleteModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4">Cancelar</button>
              <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
