import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { Link } from 'react-router-dom';

const AlumnTable = () => {
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
    console.log('Editar usuario:', user);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user) => {
    console.log('Borrar usuario:', user);
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
    console.log(`Eliminar usuario: ${selectedUser.id}`);
    closeConfirmModal();
  };

  return (
    <div className="flex justify-center overflow-x-auto m-4 p-4">
      <table className="divide-y divide-gray-600 border border-gray-300 rounded-lg">
        <thead className="bg-gray-200 gap-3 items-center">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Apellido
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Curso
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Desayuno
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Observaciones
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Ajustes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-300"> 
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.first_name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.last_name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.employment.key_skill}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.subscription.status}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.address.country}</div>
              </td>
              <td className="flex px-6 py-3 text-center text-sm font-medium">
                <button title="Editar Alumno" onClick={() => handleEdit(user)} className="text-white p-2 m-2 bg-blue-800 rounded">
                  <FaEdit />
                </button>
                <button title="Eliminar Alumno" onClick={() => handleDelete(user)} className="text-white p-2 m-2 bg-red-700 rounded">
                  <MdDelete />
                </button>
                <Link to="/intranet/alumno/actividad" className="p-2 m-2 bg-yellow-300 rounded flex items-center justify-center" title="Ver Actividades Alumno">
                  <CiViewList />
                </Link>
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
                                    <h3 className="mb-5 text-xl text-center leading-6 font-medium text-gray-400">Editar Alumno</h3>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 m-2">Nombre</label>
                                            <input type="text" name="nombre" id="nombre" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  defaultValue={selectedUser?.first_name || ''} readOnly />
                                        </div>

                                        <div>
                                            <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 m-2">Apellido</label>
                                            <input type="text" name="apellidos" id="apellido" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={selectedUser?.last_name || ''} readOnly/>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="curso" className="block text-sm font-medium text-gray-700 m-2">Curso</label>
                                            <input type="text" name="curso" id="curso" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={selectedUser?.employment.key_skill || ''} readOnly  />
                                        </div>

                                        <div>
                                            <label htmlFor="opciones" className="block text-sm font-medium text-gray-700 m-2">Desayuno</label>
                                            <select name="opciones" id="opciones" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={selectedUser?.subscription.status === 'yes'? 'si' : 'no'}>
                                                <option value="">Seleccione una opción</option>
                                                <option value="si">Sí</option>
                                                <option value="no">No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                            <label htmlFor="text" className="block text-sm font-medium text-gray-700 m-2">Observaciones</label>
                                            <input type="text" name="text" id="observaciones" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  defaultValue={selectedUser?.address.country || ''} readOnly />
                                        </div>

                                    <div className="mt-9 justify-center bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
                                            Guardar
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
                <h3 className="mb-5 text-xl text-center leading-6 font-medium text-gray-400">¿Seguro que quieres Eliminar este Alumno?</h3>
                <div className="mt-9 justify-center bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={deleteUser}>
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

export default AlumnTable;
