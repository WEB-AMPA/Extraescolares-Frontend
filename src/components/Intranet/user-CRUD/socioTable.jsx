import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { Link } from 'react-router-dom';

const SociosTable = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://random-data-api.com/api/users/random_user');
        const data = await response.json();
        setUsers([data]);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteUser = () => {
    closeConfirmModal();
  };

  return (
    <div className="flex justify-center overflow-x-auto m-4 p-4">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nº. Socio</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Apellido</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nº. Teléfono</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Correo</th>
            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Ajustes</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 whitespace-nowrap">{user.id}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.first_name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.last_name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.phone_number}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
              <td className="px-4 py-2 flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 justify-center">
                <button title="Editar Socio" onClick={() => handleEdit(user)} className="flex flex-col items-center p-2 rounded-lg bg-blue-600 text-white w-24 h-24">
                  <FaEdit className="w-6 h-6 mb-1"/>
                  <span className="text-sm">Editar</span>
                </button>
                <button title="Eliminar Socio" onClick={() => handleDelete(user)} className="flex flex-col items-center p-2 rounded-lg bg-red-600 text-white w-24 h-24">
                  <MdDelete className="w-6 h-6 mb-1"/>
                  <span className="text-sm">Eliminar</span>
                </button>
                <Link to="/intranet/socios/info" className="flex flex-col items-center p-2 rounded-lg bg-yellow-400 text-black w-24 h-24" title="Ver Alumnos Registrados">
                  <CiViewList className="w-6 h-6 mb-1"/>
                  <span className="text-sm">Ver más</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full p-6">
              <form>
                <h3 className="mb-4 text-lg text-center font-medium text-gray-700">Editar Socio</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="nroSocio" className="block text-sm font-medium text-gray-700">Nº de Socio:</label>
                    <input type="number" name="nroSocio" id="nroSocio" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue={selectedUser?.id || ''} readOnly />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Nº Teléfono:</label>
                    <input type="tel" name="telefono" id="telefono" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue={selectedUser?.phone_number || ''} readOnly />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre:</label>
                    <input type="text" name="nombre" id="nombre" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue={selectedUser?.first_name || ''} readOnly />
                  </div>
                  <div>
                    <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">Apellidos:</label>
                    <input type="text" name="apellidos" id="apellidos" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue={selectedUser?.last_name || ''} readOnly />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo:</label>
                  <input type="email" name="correo" id="correo" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" defaultValue={selectedUser?.email || ''} readOnly />
                </div>
                <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                  <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>Guardar cambios</button>
                  <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={closeModal}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {isConfirmModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full p-6">
              <h3 className="mb-4 text-lg text-center font-medium text-gray-700">¿Seguro que quieres eliminar este socio?</h3>
              <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={deleteUser}>Confirmar</button>
                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={closeConfirmModal}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SociosTable;
