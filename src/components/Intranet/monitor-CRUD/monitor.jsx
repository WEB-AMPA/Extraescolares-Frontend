import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MonitoresTable = () => {
  const [monitors, setMonitors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedMonitor, setSelectedMonitor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/role/monitor');
        const data = await response.json();
        setMonitors(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (monitor) => {
    console.log('Editar monitor:', monitor);
    setSelectedMonitor(monitor);
    setIsModalOpen(true);
  };

  const handleDelete = (monitor) => {
    console.log('Borrar monitor:', monitor);
    setSelectedMonitor(monitor);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteMonitor = () => {
    console.log(`Eliminar monitor: ${selectedMonitor.id}`);
    closeConfirmModal();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMonitors = monitors.filter(monitor =>
    `${monitor.name} ${monitor.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center w-full overflow-x-auto m-4 p-4">
      <table className="divide-y divide-gray-600 border border-gray-300 rounded-lg">
        <thead className="bg-gray-200 gap-3 items-center">
          <tr>
            <th colSpan="3" scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              <input
                type="text"
                placeholder="Buscar por Nombre y Apellidos..."
                value={searchTerm}
                onChange={handleSearch}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </th>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Actividad
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredMonitors.map((monitor) => (
            <tr key={monitor._id} className="border-b border-gray-300">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{`${monitor.name} ${monitor.lastname}`}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{monitor.actividad}</div>
              </td>
              <td className="flex px-6 py-3 text-center text-sm font-medium">
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
                  <h3 className="mb-5 text-xl text-center leading-6 font-medium text-gray-400">Editar Monitor</h3>
                  <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 m-2">Nombre:</label>
                    <input type="text" name="nombre" id="nombre" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={selectedMonitor?.name || ''} readOnly />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 m-2">Apellidos:</label>
                    <input type="text" name="apellidos" id="apellidos" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={selectedMonitor?.lastname || ''} readOnly />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="actividad" className="block text-sm font-medium text-gray-700 m-2">Actividad:</label>
                    <input type="text" name="actividad" id="actividad" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={selectedMonitor?.actividad || ''} readOnly />
                  </div>
                  <div className="mt-9 justify-center bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
                      Guardar cambios
                    </button>
                    <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
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
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="confirm-modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="mb-5 text-xl text-center leading-6 font-medium text-gray-400">¿Seguro que quieres eliminar este monitor?</h3>
                <div className="mt-9 justify-center bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={deleteMonitor}>
                    Confirmar
                  </button>
                  <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeConfirmModal}>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitoresTable;
