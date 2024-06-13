import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';


const MonitoresTable = () => {
  const [monitors, setMonitors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedMonitor, setSelectedMonitor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [activities, setActivities] = useState([]);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchMonitors();
    fetchActivities();
  }, []);

  const fetchMonitors = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/role/monitor');
      if (!response.ok) {
        throw new Error('Error fetching monitors');
      }
      const data = await response.json();
      setMonitors(data);
    } catch (error) {
      console.error('Error fetching monitors:', error);
    }
  };


  const fetchActivities = async () => {
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
  };



  const handleEdit = (monitor) => {
    setSelectedMonitor(monitor);
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
    } catch (error) {
      console.error('Error deleting monitor:', error);
    }
    closeConfirmModal();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Reset current page to 0 when search term changes
  };

  const updateMonitor = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/users/${selectedMonitor._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedMonitor),
      });
      const updatedMonitor = await response.json();
      setMonitors(monitors.map(monitor => (monitor._id === updatedMonitor._id ? updatedMonitor : monitor)));
      closeModal();
    } catch (error) {
      console.error('Error updating monitor:', error);
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
                <div className="text-sm text-gray-900">{monitor.actividad}</div>
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
              Showing <span className="font-medium">{offset + 1}</span> to <span className="font-medium">{Math.min(offset + itemsPerPage, filteredMonitors.length)}</span> of{' '}
              <span className="font-medium">{filteredMonitors.length}</span> results
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
              {[...Array(pageCount).keys()].map(number => (
                <button
                  key={number}
                  onClick={() => handlePageClick(number)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${number === currentPage ? 'bg-indigo-600 text-white' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'} focus:z-20 focus:outline-offset-0`}
                >
                  {number + 1}
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
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <form onSubmit={updateMonitor}>
                  <h3 className="mb-4 text-xl font-bold text-gray-900">Modificar Monitor</h3>
                  <label className="block mb-4">
                    <span className="text-gray-700">Nombre:</span>
                    <input type="text" name="name" value={selectedMonitor.name} onChange={(e) => setSelectedMonitor({ ...selectedMonitor, name: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                  </label>
                  <label className="block mb-4">
                    <span className="text-gray-700">Apellidos:</span>
                    <input type="text" name="lastname" value={selectedMonitor.lastname} onChange={(e) => setSelectedMonitor({ ...selectedMonitor, lastname: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                  </label>
                  <label className="block mb-4">
                    <span className="text-gray-700">Actividad:</span>
                    <select name="actividad" value={selectedMonitor.actividad} onChange={(e) => setSelectedMonitor({ ...selectedMonitor, actividad: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                      {activities.map((activity) => (
                        <option key={activity._id} value={activity._id}>{activity.name}</option>
                      ))}
                    </select>
                  </label>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                      Guardar
                    </button>
                    <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {isConfirmModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="mb-4 text-xl font-bold text-gray-900">Confirmar Eliminación</h3>
                <p className="text-sm text-gray-500">¿Estás seguro de que quieres eliminar a {selectedMonitor.name} {selectedMonitor.lastname}?</p>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={deleteMonitor}>
                  Eliminar
                </button>
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeConfirmModal}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitoresTable;
