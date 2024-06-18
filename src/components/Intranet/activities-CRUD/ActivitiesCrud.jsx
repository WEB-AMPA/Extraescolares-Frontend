import { useState, useEffect } from 'react';
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
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
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
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
    activity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * itemsPerPage;
  const currentActivities = filteredActivities.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredActivities.length / itemsPerPage);

  return (
    <div className="flex flex-col justify-center overflow-x-auto m-4 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="relative" style={{ maxWidth: '300px' }}>
          <input
            type="text"
            placeholder="Buscar Actividad"
            value={searchTerm}
            onChange={handleSearch}
            className="shadow appearance-none border rounded-full w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
        <button
          onClick={() => window.location.href = '/intranet/createactivity'}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-full"
        >
          Crear Actividad
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">Actividad</th>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">Categoría</th>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">Monitor</th>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">Centro</th>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">Horario</th>
            <th scope="col" className="px-4 py-3 text-center text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentActivities.map((activity) => (
            <tr key={activity._id} className="border-b border-gray-300 hover:bg-gray-100 transition duration-200">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">{activity.name}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">{activity.categories.map(category => category.name).join(', ')}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">{activity.monitor?.username || 'N/A'}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">{activity.centers.map(center => center.name).join(', ')}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">{activity.scheduleDay?.map(day => day.days).join(', ')} {activity.scheduleHour?.map(hour => hour.range).join(', ')}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex flex-col sm:flex-row justify-center items-center space-x-0 sm:space-x-2 sm:space-y-0 space-y-2">
                  <button title="Editar Actividad" onClick={() => handleEdit(activity)} className="text-white bg-blue-600 rounded-lg p-2 flex flex-col items-center w-20 sm:w-auto transition duration-300 ease-in-out transform hover:scale-105">
                    <FaEdit className="w-5 h-5 mb-1" />
                    <span className="text-xs font-light">Editar</span>
                  </button>
                  <button title="Eliminar Actividad" onClick={() => openDeleteModal(activity._id)} className="text-white bg-red-600 rounded-lg p-2 flex flex-col items-center w-20 sm:w-auto transition duration-300 ease-in-out transform hover:scale-105">
                    <MdDelete className="w-5 h-5 mb-1" />
                    <span className="text-xs font-light">Eliminar</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-lg shadow-lg">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 0}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Anterior
          </button>
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage >= pageCount - 1}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Siguiente
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{offset + 1}</span> a{" "}
              <span className="font-medium">
                {Math.min(offset + itemsPerPage, filteredActivities.length)}
              </span>{" "}
              de <span className="font-medium">{filteredActivities.length}</span>{" "}
              resultados
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 0}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {[...Array(pageCount).keys()].map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                    page === currentPage
                      ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage >= pageCount - 1}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10 shadow-lg w-full max-w-2xl mx-4">
            <h2 className="text-xl font-bold mb-4">Editar Actividad</h2>
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
              <button onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4">Cancelar</button>
              <button onClick={saveActivity} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10 shadow-lg w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
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
