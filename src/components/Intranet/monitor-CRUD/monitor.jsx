import { useState, useEffect, useCallback } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const MonitoresTable = () => {
  const [monitors, setMonitors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedMonitor, setSelectedMonitor] = useState(null);
  const [selectedActivityId, setSelectedActivityId] = useState(null); // Estado para el ID de la actividad seleccionada
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(false); // Estado para controlar el refetch automático

  const itemsPerPage = 10;

  const fetchActivities = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/api/activities');
      if (!response.ok) {
        throw new Error('Error fetching activities');
      }
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  }, []);

  const fetchMonitors = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/role/monitor');
      if (!response.ok) {
        throw new Error('Error fetching monitors');
      }
      const data = await response.json();
      setUsers(data);
      
      const monitorsData = data.map(user => {
        const activity = activities.find(activity => activity.monitor && activity.monitor._id === user._id);
        return {
          _id: user._id,
          name: user.name,
          lastname: user.lastname,
          activity: activity ? activity.name : 'No asignada',
          activityId: activity ? activity._id : null
        };
      });

      setMonitors(monitorsData);
    } catch (error) {
      console.error('Error fetching monitors:', error);
    }
  }, [activities]);

  useEffect(() => {
    fetchActivities();
    fetchMonitors();
  }, [fetchActivities, fetchMonitors, shouldRefetch]); // Dependencias actualizadas para incluir fetchMonitors

  const handleEdit = (monitor) => {
    setSelectedMonitor(monitor);
    setSelectedActivityId(monitor.activityId); // Establecer la actividad seleccionada para el monitor seleccionado
    setIsModalOpen(true);
  };

  const handleDelete = (monitor) => {
    setSelectedMonitor(monitor);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteMonitor = async () => {
    try {
      await fetch(`http://localhost:3000/api/users/${selectedMonitor._id}`, {
        method: 'DELETE',
      });
      setMonitors(monitors.filter(monitor => monitor._id !== selectedMonitor._id));
      setShouldRefetch(true); // Activar refetch automático después de eliminar
    } catch (error) {
      console.error('Error deleting monitor:', error);
    }
    closeConfirmModal();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const updateActivity = async (e) => {
    e.preventDefault();
    try {
      const updatedActivity = { newMonitorUsername: selectedMonitor._id, activityId: selectedActivityId }; // Incluir activityId en los datos actualizados
      const response = await fetch(`http://localhost:3000/api/activities/${selectedActivityId}/update-monitor`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedActivity),
      });
      if (!response.ok) {
        throw new Error('Error updating activity');
      }

      const updatedActivityData = await response.json();
      setActivities(activities.map(activity => activity._id === updatedActivityData._id ? updatedActivityData : activity));
      setShouldRefetch(true); // Activar refetch automático después de actualizar
      closeModal();
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  const filteredMonitors = monitors.filter(monitor =>
    `${monitor.name} ${monitor.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredMonitors.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredMonitors.slice(offset, offset + itemsPerPage);

  return (
    <div className="flex flex-col justify-center w-full overflow-x-auto m-4 p-4">
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
      onClick={() => window.location.href = '/intranet/createuser'}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Crear Monitor
    </button>
  
      </div>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Nombre y Apellidos
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Actividad
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentPageData.map((monitor) => (
            <tr key={monitor._id} className="border-b border-gray-300">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{`${monitor.name} ${monitor.lastname}`}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{monitor.activity}</div>
              </td>
              <td className="flex justify-center px-6 py-3 text-sm font-medium">
                <button title="Editar Monitor" onClick={() => handleEdit(monitor)} className="text-white p-2 m-2 bg-blue-800 rounded">
                  <FaEdit />
                </button>
                <button title="Eliminar Monitor" onClick={() => handleDelete(monitor)} className="text-white p-2 m-2 bg-red-700 rounded">
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 0}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage >= pageCount - 1}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{offset + 1}</span> a{' '}
              <span className="font-medium">{Math.min(offset + itemsPerPage, filteredMonitors.length)}</span> de{' '}
              <span className="font-medium">{filteredMonitors.length}</span> resultados
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
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
                    page === currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Edit Monitor</h2>
            <form onSubmit={updateActivity}>
              <label className="block mb-2">
                Actividad:
                <select
                  value={selectedActivityId}
                  onChange={(e) => setSelectedActivityId(e.target.value)}
                  className="block w-full mt-1 p-2 border rounded"
                >
                  {activities.map(activity => (
                    <option key={activity._id} value={activity._id}>
                      {activity.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2">
                Monitor:
                <select
                  value={selectedMonitor?._id}
                  onChange={(e) => setSelectedMonitor({ ...selectedMonitor, _id: e.target.value })}
                  className="block w-full mt-1 p-2 border rounded"
                >
                  {users.map(user => (
                    <option key={user._id} value={user._id}>
                      {`${user.name} ${user.lastname}`}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex justify-end">
                <button type="button" onClick={closeModal} className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2">Cancel</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete {selectedMonitor.name} {selectedMonitor.lastname}?</p>
            <div className="flex justify-end mt-4">
              <button type="button" onClick={closeConfirmModal} className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2">Cancel</button>
              <button onClick={deleteMonitor} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitoresTable;
